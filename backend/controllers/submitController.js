const { generateFile } = require("../compiler/generateFile.js");
const { submitCpp } = require("../compiler/submitCode/submitCpp.js");
const { submitPy } = require("../compiler/submitCode/submitPy.js");
const { submitJava } = require("../compiler/submitCode/submitJava.js");
const { compileCpp } = require("../compiler/execCode/execCpp.js");
const Submission = require("../models/Submissions.js");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { execPy } = require("../compiler/execCode/execPy.js");
const Contest = require('../models/Contest.js')
const UserContest=require('../models/UserContest.js');
const Result = require("../models/Results.js");

const execFilesPath = path.join(__dirname, "../compiler", "execFiles");
if (!fs.existsSync(execFilesPath))
  fs.mkdirSync(execFilesPath, { recursive: true });

const submit = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;
  if (!token) return res.json({ success: false, message: "Login to Submit" });
  const decode = jwt.decode(token, process.env.SECRET_KEY);
  const email = decode.email;
  const user = await User.findOne({ email });
  const { language = "cpp", code,contestID } = req.body;
  if (code === undefined)
    return res.status(400).json({ success: false, message: "Empty code!" });

  
  try {
    const filePath = await generateFile(language, code);
    let output = "";
    if (language === "cpp" || language === "c") {
      const fileName = path.basename(filePath).split(".")[0];
      const execFile = path.join(execFilesPath, `${fileName}.out`);
      
        await compileCpp(filePath, execFile);
        output = await submitCpp(execFile, id);
      
    } else if (language === "py") {
        await submitPy(filePath,id);
      
    }else if (language === "java") return res.json({ success: false, 'output':'java not supported'  });
    console.log(output);
    await Submission.create({
      user: user._id,
      problem: id,
      language,
      code,
      result: output.message,
      time:output.time*1000
    });
    if(contestID){
       contestsubmit(contestID,user._id.toString(),id,output.message);
    }
     return res.json({ success: true, output });
  } catch (error) {
    await Submission.create({
      user: user._id,
      problem: id,
      language,
      code,
      result: error.type,
      time:error.time*1000
    });
    if(contestID){
      contestsubmit(contestID,user._id.toString(),id,err.type);
   }
    res.json({ success: false, 'output':error  });
  }
};

const contestsubmit=async (contestID,userID,problemID,result)=>{
try{
   const contest=await Contest.findById(contestID);
   if(!contest)return ;

   if(contest.endtime.getTime()<Date.now()||contest.starttime.getTime()>Date.now())return ;

   let userContest=await UserContest.findOne({contest:contestID,user:userID});
   if(!userContest)
    {
      userContest=await UserContest.create({
        contest:contestID,
        user:userID,
        problems: contest.problems.map(problem => ({
          problem: problem.problem._id,
          score: 0, 
        })),
      });
      console.log(userContest)
      const result=await Result.findOne({contest});
      result.results.push(userContest._id);
      console.log(result);
      await result.save();
    }
    let newscore=0;
    const problemIndex = userContest.problems.findIndex(
      problem1=> problem1.problem.toString() === problemID
    );
    console.log(problemIndex,result)
    if(problemIndex==-1) return;
    if(result=='Accepted'&&userContest.problems[problemIndex].score===0){
      newscore=Math.floor(contest.problems[problemIndex].maxscore*(contest.endtime.getTime()-Date.now())/(contest.endtime.getTime()-contest.starttime.getTime()));
      userContest.totalscore+=newscore;
      userContest.problems[problemIndex].score =newscore;
      console.log(userContest);
      await userContest.save();
    }
    else return;
}  
catch(err){
  console.log("error in contestsubmit",err);
}
}

module.exports = { submit };

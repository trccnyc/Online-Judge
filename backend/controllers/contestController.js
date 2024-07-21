const Contest = require("../models/Contest");
const Result = require("../models/Results.js");
const schedule =require( 'node-schedule');

const addContest = async (req, res) => {
  try {
    console.log(req.body);
    let { title, description, problems, starttime, endtime } = req.body;
    if (!(title && description && problems && starttime && endtime&&(problems.length!==0)))
      return res.status(400).send({
        success: false,
        message: "Please enter all info",
      });
    if (!Array.isArray(problems)) {
      return res.status(400).json({ message: "Problems must be an array" });
    }
    
    if (problems) {
      for (const item of problems) {
        if (!item.problem || typeof item.maxscore !== "number") {
          return res
            .status(400)
            .json({
              message:
                "Each problem must have a valid `problem` ID and `score`",
            });
        }
      }
    }
    starttime=new Date(starttime);
    endtime=new Date(endtime);
    let contest=await Contest.findOne({title});
    if(contest){
      contest.description = description;
      contest.starttime = starttime;
      contest.endtime = endtime;
      contest.problems = problems;
      await contest.save();
      await scheduleSaveResult(contest._id,endtime);
      res.status(200).json({
        success: true,
        message: "Contest is updated",
        contest,
      });}
    
    else{ contest = await Contest.create({
      title,
      description,
      problems,
      starttime,
      endtime,
    }
  );
  const result=await Result.create({contest});
  await scheduleSaveResult(contest._id,endtime);
    res.status(200).json({
        success: true,
        message: "Contest is sheduled",
        contest,
      });}
  } catch (err) {
    console.log("Error in addContest",err);
  }
};
const fetchContestbyID = async (req, res) => {
  try {
    const { id } = req.params;
    const contest = await Contest.findById(id).populate({
      path: 'problems.problem',
      select: 'title'});
    const start=new Date(contest.starttime)
    if(start.getTime()>Date.now())contest.problems=[];

    res.json({ success: true, contest });
  } catch (err) {
    console.log(
      "Error in fetchContestbyID",
      err
    );
  }
};
const fetchContests = async (req, res) => {
  try {
    
    const contests = await Contest.find({});
    res.json({ success: true, contests });
  } catch (err) {
    console.log("Error in fetchContests", err);
  }
};
const calculateResults=async (req,res)=>{
  try {
    const { id } = req.params;
    const result = await Result.findOne({contest:id}).populate({
      path: 'results',
      select: 'totalscore'}).populate({
        path: 'contest',
        select: 'endtime'
      }).populate({
        path: 'results',
        populate: {
          path: 'user',
          select: 'email',
        },
      });
    if (!result) {
      throw new Error('Contest not found');
    }
   if(result.contest.endtime.getTime()>Date.now()){
    result.results.sort((a, b) => b.totalscore - a.totalscore);
   }
    res.json({success:true,result});
  } catch (error) {
    console.error('Error in calculateResults', error);
  }
}
const SaveResults=async (id)=>{
  try {
    const result = await Result.findOne({contest:id}).populate({
      path: 'results',
      select: 'totalscore'});

    if (!result) {
      throw new Error('Contest not found');
    }

    result.results.sort((a, b) => b.totalscore - a.totalscore);

    // Save the sorted results
    result.markModified('results');
    await result.save();
    res.json({success:true,result});
  } catch (error) {
    console.error('Error in calculateResults', error);
  }
}
const scheduleSaveResult = async (contestID, endtime) => {
  try{
    console.log(endtime); 
  const job=schedule.scheduleJob(endtime, () => SaveResults(contestID));
  var list = schedule.scheduledJobs;
  console.log(list);
}
  
  catch(err){
    console.log('error in scheduleSaveResult',err);
  }
};
module.exports={addContest,fetchContestbyID,fetchContests,calculateResults}    
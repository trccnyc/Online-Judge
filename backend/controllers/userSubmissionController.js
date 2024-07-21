const Submission=require('../models/Submissions');
const jwt = require("jsonwebtoken");


const allSubmissions=async(req,res)=>{
    const token = req.cookies.token;
    if (!token) return res.json({ success: false, message: "Login to see your Submissions" });
    const decode = jwt.decode(token, process.env.SECRET_KEY);
    const submissions=await Submission.find({user:decode.id}).populate('problem').sort({submitted_at:-1});
    res.send(submissions);
}
const problemSubmissions=async(req,res)=>{
    const {id}=req.params;
    const token = req.cookies.token;
    if (!token) return res.json({ success: false, message: "Login to see your Submissions" });
    const decode = jwt.decode(token, process.env.SECRET_KEY);
    const submissions=await Submission.find({user:decode.id,problem:id}).populate('problem').sort({submitted_at:-1});
    res.send(submissions);
}

module.exports={allSubmissions,problemSubmissions}
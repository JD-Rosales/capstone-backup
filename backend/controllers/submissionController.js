const Submission = require('../models/submissionModel')
const Assignment = require('../models/assignmentModel')
const moment = require('moment');

const addSubmission = async (req, res) => {
  try {

    const auth = req.user
    if(auth.role !== "student"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const { assignmentID, timeLeft, score, date, deadline } = req.body

    if(!assignmentID || !timeLeft || !score || !date || !deadline){
      return res.status(400).json({message: "Please input all required fields"})
    }

    // change submission state if submitted late
    let late = false
    if(moment(date).format() > moment(deadline).format()){
      late = true
    }

    const submission = await Submission.create({
      user: auth.id,
      assignment: assignmentID,
      timeLeft: timeLeft,
      score: score,
      late: late,
      date: moment(date).format()
    })

    if(submission){
      await Assignment.findOneAndUpdate(
        { _id: assignmentID },
        { $push: { submissions: {student: auth.id, submission: submission._id, late: submission.late } } }
      )
  
      return res.status(200).json({ submission })
    }
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: "An error has occured"})
  }
}


const checkSubmission = async (req, res) => {
  try {
    const auth = req.user

    const submission = await Submission.find({"user": auth.id, "assignment": req.params.id})

    return res.status(200).json({submission})
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: "An error has occured"})
  }
}

const getSubmissions = async (req, res) => {
  try {
    const submission = await Submission.find({"assignment": req.params.id}).populate('user')

    return res.status(200).json({submission})
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: "An error has occured"})
  }
}

module.exports = {
  addSubmission,
  checkSubmission,
  getSubmissions
}
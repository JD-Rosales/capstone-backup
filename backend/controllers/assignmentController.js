const Assignment = require('../models/assignmentModel')
const Submission = require('../models/submissionModel')
const moment = require('moment');
// const User = require('../models/userModel')

// 
const addAssignment = async (req, res) => {
  try {
    const auth = req.user
    if(auth.role !== "teacher"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const { title, description, wordsArray, date, time, timer} = req.body

    if(!title || title === ""){
      return res.status(400).json({ message: 'Assignment title is required'})
    } else if(!description || description === ""){
      return res.status(400).json({ message: 'Assignment description is required'})
    } else if(!wordsArray || !wordsArray.length){
      return res.status(400).json({ message: 'Please assign atleast 1 word/letter'})
    } else if(!date || !time){
      return res.status(400).json({ message: 'Date & Time is required'})
    } else if(!timer){
      return res.status(400).json({ message: 'Date & Time is required'})
    } else if(timer < 30){
      return res.status(400).json({ message: 'Please input atleast 30 sec timer'})
    }

    const currentDate = moment(new Date()).format()
    const deadline = date+'T'+time

    if(deadline < currentDate){
      return res.status(400).json({message: "Invalid Date/Time"})
    }

    await Assignment.create({
      user: auth.id,
      classCode: auth.userInfo.classCode,
      words: wordsArray,
      title: title,
      description: description,
      deadline: deadline,
      timer: timer * 1000,
      submissions: [],
    })

    const assignments = await Assignment.find({ "classCode": auth.userInfo.classCode }).select('-password').lean()

    return res.status(200).json({ assignments })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const getAssignments = async (req, res) => {
  try {
    const auth = req.user

    const task = await Assignment.find({ "classCode": auth.userInfo.classCode }).select('-password').lean()

    const currentDate = moment(new Date()).format()

    // convert assignment json object data to array
    const data = task.map((item) => {
      return item
    })

    // filter expired assignment that is less than the current date and time
    const expiredAssignments = data.filter((item) => {
      formattedDate = moment(item.deadline).format()
      return formattedDate <= currentDate
    })

    // map all expired id into an array
    const expiredID = expiredAssignments.map((item) => {
      return item._id
    })

    await Assignment.updateMany(
      {
        _id: {
          $in: expiredID
        }
      },
      {
        $set: {
          isClose: true
        }
      }
    )

    const assignments = await Assignment.find({ "classCode": auth.userInfo.classCode }).populate({ 
      path: 'submissions',
      populate: {
        path: 'submission',
        model: 'Submission'
      } 
   }).select('-password').lean()

    return res.status(200).json({ assignments })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const updateAssignment = async(req, res) => {
  try {

    const {title, description} = req.body

    if(!title, !description){
      return res.status(400).json({message: "Please input all required fields"})
    }

    const auth = req.user

    if(auth.role !== "teacher"){
      return res.status(401).json({message: "Unauthorized!"})
    }

    await Assignment.findByIdAndUpdate(
      req.params.id,
      {
        "title": title,
        "description": description
      },
      {new: true}
    )

    const assignments = await Assignment.find({ "classCode": auth.userInfo.classCode }).select('-password').lean()

    return res.status(200).json({ assignments })

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const deleteAssignment = async(req, res) => {
  try {
    const auth = req.user

    if(auth.role !== "teacher"){
      return res.status(401).json({message: "Unauthorized!"})
    }

    const assignment = Assignment.findById(req.params.id)
    if(!assignment){
      return res.status(404).json({message: 'ID not found'})
    }

    await assignment.deleteOne()

    // delete all assignment submissions
    const submission = Submission.find({"assignment": req.params.id})
    await submission.deleteMany()

    const assignments = await Assignment.find({ "classCode": auth.userInfo.classCode }).select('-password').lean()

    return res.status(200).json({ assignments })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

module.exports = {
  addAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment
}
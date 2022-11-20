const User = require('../models/userModel')

const getEnrolledStudents = async (req, res) => {
  try {

    const auth = req.user

    if(auth.role !== "teacher"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const students = await User.find({ "userInfo.classCode": req.params.classCode, "role":  "student" }).select('-password').lean().exec()

    return res.status(200).json({ students })
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  getEnrolledStudents,
}
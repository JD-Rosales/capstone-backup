const User = require('../models/userModel')

//PATCH  /api/admin/get-unactivated
const getUnactivated = async (req, res) => {
  try {
    const auth = req.user

    if(auth.role !== "admin"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const teachers = await User.find({ "role": "teacher", "userInfo.status": false }).select('-password').lean()

    res.status(200).json({ teachers })
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

//PATCH  /api/teacher/update-status/:id
const updateStatus = async (req, res) => {
  try {

    const auth = req.user

    if(auth.role !== "admin"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const teacher = await User.findById(req.params.id)

    if(!teacher){
      return res.status(404).json({ message: 'ID not found!'})
    }

    await User.findByIdAndUpdate(
      req.params.id,
      {"userInfo.status": true},
      {new: true}
    )

    const teachers = await User.find({ "role": "teacher", "userInfo.status": false }).select('-password').lean()

    return res.status(200).json({ teachers })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

module.exports = {
  getUnactivated,
  updateStatus,
}
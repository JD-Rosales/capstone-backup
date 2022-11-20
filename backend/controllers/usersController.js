const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const randomString = require('randomstring')
const { cloudinary } = require('../config/cloudinary')
const { generateToken } = require('../utils/generateToken');

//api/users
const signUp = async (req, res) => {
  try {
    let { email , password, userInfo} = req.body
    const role = req.body.role

    //check if all required fields are present
    if (!email){
      res.status(400).json({ message: 'Email is required'})
    } else if (!password) {
      res.status(400).json({ message: 'Password is required'})
    } else if (role !== "admin" && role !== "teacher" && role !== "student" && role !== "generaluser") {
      res.status(400).json({ message: 'Invalid user role'})
    } else if (!userInfo.firstName) {
      res.status(400).json({ message: 'First name is required'})
    } else if (!userInfo.lastName) {
      res.status(400).json({ message: 'Last name is required'})
    } else if(!userInfo.middleInitial){
      return res.status(400).json({ message: 'M.I is required'})
    } else {

      password = password.trim()
      email = email.trim()

      //hash the password
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      //check if email is already registered
      const emailExists = await User.findOne({"email": email}).lean().exec()

      if (emailExists) {
        res.status(409).json({ message: 'Email is already registered'})
      } else {

        if(role === "admin"){
          const secretCode = req.body.secretCode

          if(secretCode !== process.env.ADMIN_SECRET_CODE) {
            return res.status(403).json({ message: 'Invalid Secret Code' })
          }

          const user = await User.create({
            email: email,
            password: hashPassword,
            role: role,
            userInfo: userInfo
          })

          //return user data if success
          if(user) {
            return res.status(201).json({ user, token: generateToken(user._id)})
          } else {
            return res.status(400).json({ message: 'An error has occured'})
          }
        } else if (role === "teacher") {

          //check if school field if present
          if (!userInfo.school) {
            return res.status(400).json({ message: 'School is required'})
          }

          //generate a classCode and check if classCode has a duplicate
          let classCode;
          while(true){
            classCode = randomString.generate({
              length: 8,
              readable: true
            })
            const codeExists = await User.findOne({"role": role, "userInfo.classCode": classCode}).lean().exec()
            //if generated code do not exists break the loop
            if(!codeExists){
              break
            }
          }
          userInfo.classCode = classCode

          const user = await User.create({
            email: email,
            password: hashPassword,
            role: role,
            userInfo: userInfo
          })
          
          //return user data if success
          if(user) {
            return res.status(201).json({ user, token: generateToken(user._id)})
          } else {
            return res.status(400).json({ message: 'An error has occured'})
          }

        } else if (role === "student") {

          //check if school field if present
          if (!userInfo.school) {
            return res.status(400).json({ message: 'School is required'})
          }

          //search class code in teacher role
          const codeExists = await User.findOne({"role": "teacher", "userInfo.classCode": userInfo.classCode}).lean().exec()

          //return if cannot find class code
          if(!codeExists) {
            return res.status(400).json({ message: "Invalid class code"})
          }

          const user = await User.create({
            email: email,
            password: hashPassword,
            role: role,
            userInfo: userInfo
          })

          //return user data if success
          if(user) {
            return res.status(201).json({ user, token: generateToken(user._id)})
          } else {
            return res.status(400).json({ message: 'An error has occured'})
          }

        } else {  //generalUser

          const user = await User.create({
            email: email,
            password: hashPassword,
            role: role,
            userInfo: userInfo
          })

          //return user data if success
          if(user) {
            return res.status(201).json({ user, token: generateToken(user._id)})
          } else {
            return res.status(400).json({ message: 'An error has occured'})
          }

        }

      }

    }

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

//api/users/login
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body

    if (!email) {
      res.status(400).json({ message: 'Email is required'})
    } else if (!password) {
      res.status(400).json({ message: 'Password is required'})
    } else if (!role) {
      res.status(400).json({ message: 'Role is required'})
    } else if (role !== "admin" && role !== "teacher" && role !== "student" && role !== "generaluser") {
      res.status(400).json({ message: 'Invalid user role'})
    } else {

      password.trim()
      email.trim()

      if(role === "teacher"){
        const user = await User.findOne({ "role": "teacher", email }).lean().exec()
  
        if(!user){
          res.status(404).json({ message: "Email not found"})
        } else {
  
          //compare hash password
          const auth = await bcrypt.compare(password, user.password)
          if (auth) {
            delete user.password  //removes the password key
            res.status(200).json({ user, token: generateToken(user._id) })
          } else {
            res.status(401).json({ message: "Invalid password"})
          }
        }
  
      } else if (role === 'student') {
        const user = await User.findOne({ "role": "student", email }).lean().exec()

        if(!user){
          res.status(404).json({ message: "Email not found"})
        } else {

          //compare hash password
          const auth = await bcrypt.compare(password, user.password)
          if (auth) {
            delete user.password  //removes the password key
            res.status(200).json({ user, token: generateToken(user._id) })
          } else {
            res.status(401).json({ message: "Invalid password"})
          }
        }
      } else if (role === "admin") {
        const user = await User.findOne({ "role": "admin", email }).lean().exec()

        if (!user) {
          res.status(404).json({ message: "Email not found"})
        } else {

          //compare hash password
          const auth = await bcrypt.compare(password, user.password)
          if(auth) {
            delete user.password  //removes the password key
            res.status(200).json({ user, token: generateToken(user._id) })
          } else {
            res.status(401).json({ message: "Invalid password"})
          }
        }

      } else {
        const user = await User.findOne({ "role": "generaluser", email }).lean().exec()

        if (!user) {
          res.status(404).json({ message: "Email not found"})
        } else {

          //compare hash password
          const auth = await bcrypt.compare(password, user.password)
          if(auth) {
            delete user.password  //removes the password key
            res.status(200).json({ user, token: generateToken(user._id) })
          } else {
            res.status(401).json({ message: "Invalid password"})
          }
        }
      }

    }

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

// const accounts = [
//   "studentacc_1@gmail.com",
//   "studentacc_2@gmail.com",
//   "studentacc_3@gmail.com",
//   "studentacc_4@gmail.com",
//   "studentacc_5@gmail.com",
//   "studentacc_6@gmail.com",
//   "studentacc_7@gmail.com",
//   "studentacc_8@gmail.com",
//   "studentacc_9@gmail.com",
//   "studentacc_10@gmail.com",
// ]

// let isDevelopersAccount

// accounts.map((email) => {
//   if(email === auth.email){
//     return isDevelopersAccount = true
//   }
// })

// if(isDevelopersAccount){
//   return res.status(401).json({ message: "Unable to update password. This account does not meet update password privilege."})
// }


const updateProfile = async (req, res) => {
  try {
    //check if user exist in the database
    const user = await User.findById(req.params.id).lean().exec()
    if(!user){
      return res.status(404).json({ message: 'User not found!'})
    }

    const auth = req.user

    // check if user from request header match the user that is currently logged
    if(!auth._id.equals(user._id)){
      return res.status(401).json({message: "Unauthorized, invalid credentials"})
    }

    const { lastName, firstName, middleInitial, school, email, image } = req.body
    
  const accounts = [
    "studentacc_1@gmail.com",
    "studentacc_2@gmail.com",
    "studentacc_3@gmail.com",
    "studentacc_4@gmail.com",
    "studentacc_5@gmail.com",
    "studentacc_6@gmail.com",
    "studentacc_7@gmail.com",
    "studentacc_8@gmail.com",
    "studentacc_9@gmail.com",
    "studentacc_10@gmail.com",
  ]

  let isDevelopersAccount

   accounts.map((email) => {
    if(email === auth.email){
      return isDevelopersAccount = true
    }
  })

  if(isDevelopersAccount){
    return res.status(401).json({ message: "Unable to update credentials. This account does not meet update credentials privilege."})
  }

    // if logged user is teacher or student, school field is required
    if(auth.role === "teacher" || auth.role === "student"){
      if(!school || school === ""){
        return res.status(400).json({ message: 'School is required'})
      }
    }

    if (!lastName || lastName === "") {
      res.status(400).json({ message: 'Last Name is required'})
    } else if (!firstName || firstName === "") {
      res.status(400).json({ message: 'First Name is required'})
    } else if (!middleInitial || middleInitial === "") {
      res.status(400).json({ message: 'Middle Initial is required'})
    } else if (!email || email === "") {
      res.status(400).json({ message: 'Email is required'})
    } else {

      if(!image) {  //retain prev image if there is no image
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            "userInfo.lastName": lastName,
            "userInfo.firstName": firstName,
            "userInfo.middleInitial": middleInitial,
            "userInfo.school": school,
            "email": email 
          },
          {new: true}
        )

        delete updatedUser.password  //remove the password key
        return res.status(200).json({ user: updatedUser, token: generateToken(updatedUser._id) })
      } else {

        const uploadResponse = await cloudinary.uploader.upload(image, {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
        })

        if (uploadResponse.url) { //check if image upload return an image url

          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              "userInfo.lastName": lastName,
              "userInfo.firstName": firstName,
              "userInfo.middleInitial": middleInitial,
              "userInfo.school": school,
              "email": email,
              "userInfo.image": uploadResponse.url
            },
            {new: true}
          )
  
          delete updatedUser.password  //remove the password key
          return res.status(200).json({ user: updatedUser, token: generateToken(updatedUser._id) })

        } else {
          return res.status(400).json({ message: "An error has occured!" })
        }

      }

    }

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const updateUserSettings = async (req, res) => {
  try {    

    //check if user exist in the database
    const user = await User.findById(req.params.id).lean().exec()
    if(!user){
      return res.status(404).json({ message: 'User not found!'})
    } else { 

      const auth = req.user

      // check if user from request header match the user that is currently logged
      if(!auth._id.equals(user._id)){
        return res.status(401).json({message: "Unauthorized, invalid credentials"})
      }


      if(req.body.hand === undefined){
        return res.status(400).json({ message: 'Please choose hand'})
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          "userSettings.hand" : req.body.hand 
        },
        {new: true}
      )
      delete updatedUser.password  //remove the password key
      return res.status(200).json({ user: updatedUser, token: generateToken(updatedUser._id)})
    }
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const changePassword = async (req, res) => {
  try {
    let { currentPassword, newPassword , newPassword2} = req.body

    if (!currentPassword || !newPassword || !newPassword2) {
      return res.status(400).json({ message: 'Input all required fields'})
    }

    currentPassword = currentPassword.trim()
    newPassword = newPassword.trim()
    newPassword2 = newPassword2.trim()

    const user = await User.findById(req.params.id).lean().exec()

    if(!user){
      return res.status(404).json({ message: 'User not found!'})
    }

    const auth = req.user

    // check if user from request header match the user that is currently logged
    if(!auth._id.equals(user._id)){
      return res.status(401).json({message: "Unauthorized, invalid credentials"})
    }

    // prevent changing password on special account
    const accounts = [
      "studentacc_1@gmail.com",
      "studentacc_2@gmail.com",
      "studentacc_3@gmail.com",
      "studentacc_4@gmail.com",
      "studentacc_5@gmail.com",
      "studentacc_6@gmail.com",
      "studentacc_7@gmail.com",
      "studentacc_8@gmail.com",
      "studentacc_9@gmail.com",
      "studentacc_10@gmail.com",
    ]

    let isDevelopersAccount

    accounts.map((email) => {
      if(email === auth.email){
        return isDevelopersAccount = true
      }
    })

    if(isDevelopersAccount){
      return res.status(401).json({ message: "Unable to update password. This account does not meet update password privilege."})
    }

    // Check if input password match the old password
    const isMatch = await bcrypt.compare(currentPassword, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Current Password!"})
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(newPassword, salt)

    await User.findByIdAndUpdate(
      req.params.id,
      {
        "password": hashPassword
      },
      {new: true}
    )
   
    delete user.password  //removes the password field
    return res.status(200).json({ message: "Password Updated Successfully" })
    
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "An error has occured"})
  }
}

//DELETE api/deleteAccount/:id
const deleteAccount = async (req, res) => {
  try {

    const user = await User.findById(req.params.id)

    if(!user) {
      return res.status(404).json({message: "Account not found!"})
    }

    await user.remove()
    return res.status(200).json({message: "Account has been deleted"})

  } catch (error) {
    return res.status(400).json({message: "An error has occured"})
  }
  
}

const updateProgress = async (req, res) => {
  try {
    //check if user exist in the database
    const user = await User.findById(req.params.id).lean().exec()
    if(!user){
      return res.status(404).json({ message: 'User not found!'})
    }

    const auth = req.user

    // check if user from request header match the user that is currently logged
    if(!auth._id.equals(user._id)){
      return res.status(401).json({message: "Unauthorized, invalid credentials"})
    }

    const { lesson } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        "lesson.progress": lesson
      },
      {new: true}
    )

    delete updatedUser.password  //remove the password key
    return res.status(200).json({ user: updatedUser, token: generateToken(updatedUser._id) })

  } catch (error) {
    return res.status(400).json({message: "An error has occured"})
  }
}

module.exports = {
  signUp,
  login,
  updateProfile,
  updateUserSettings,
  changePassword,
  deleteAccount,
  updateProgress
}
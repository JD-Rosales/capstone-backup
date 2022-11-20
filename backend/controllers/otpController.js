const User = require('../models/userModel')
const Otp = require('../models/otpModel')
const nodemailer = require('nodemailer');
const randomString = require('randomstring')

const sendOTP = async (req, res) => {
  try {
    const { email , password, userInfo, role} = req.body

    //check if all required fields are present
    if (!email){
      return res.status(400).json({ message: 'Email is required'})
    } else if (!password) {
      return res.status(400).json({ message: 'Password is required'})
    } else if (role !== "admin" && role !== "teacher" && role !== "student" && role !== "generaluser") {
      return res.status(400).json({ message: 'Invalid user role'})
    } else if (!userInfo.firstName) {
      return res.status(400).json({ message: 'First name is required'})
    } else if (!userInfo.lastName) {
      return res.status(400).json({ message: 'Last name is required'})
    } else if(!userInfo.middleInitial){
      return res.status(400).json({ message: 'M.I is required'})
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const passRegex = /^([\w\-]{8,16})$/

    const validateEmail =  email.match((emailRegex))
    const validatePass =  password.match((passRegex))

    if(!validateEmail){
      return res.status(400).json({ message: 'Please provide a valid email address'})
    }

    if(!validatePass){
      return res.status(400).json({ message: 'Password must be atleast 8 to 16 characters'})
    }

    //check if email is already registered
    const emailExists = await User.findOne({"email": email}).lean().exec()

    if (emailExists) {
      return res.status(409).json({ message: 'Email is already registered'})
    }

    if(role === "teacher" || role === "student"){
      //check school field if present
      if (!userInfo.school) {
        return res.status(400).json({ message: 'School is required'})
      }
    }

    // generate otp
    const otp = randomString.generate({
      length: 6,
      charset: 'numeric'
    })

    sendMail(otp, email)

    await Otp.findOneAndUpdate(
      { "email":  email},
      {
        email: email,
        otp: otp,
      },
      {new: true, upsert: true}
    )

    return res.status(200).json({ message: `OTP sent to ${email}` })    
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'An error has occured'})
  }
}

const verifyOTP = async (req, res) => {
  try {

    const {otp, email} = req.body

    const auth = await Otp.findOne({"email": email, "otp": otp})

    if(!auth){
      return res.status(400).json({ message: "Invalid OTP" })
    } else {
      await auth.deleteOne()
      return res.status(200).json({ message: "Success" })
    }
    
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'An error has occured'})
  }
}

const sendMail = async (otp, email) => {
  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
  
    const mailOptions = {
      from: 'process.env.EMAIL',
      to: email,
      subject: 'SLTG: Account OTP',
      text : `Your One Time Pin is ${otp}`
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
     console.log(error);
      } else {
        // console.log('Email sent: ' + info.response);
        console.log(`Mail sent to ${email}`)
        return info
        // do something useful
      }
    });
    
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'An error has occured'})
  }
}


module.exports = {
  sendOTP,
  verifyOTP
}
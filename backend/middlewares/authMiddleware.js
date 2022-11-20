const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protected = async (req, res, next) => {
  try {
    let token
    
    // check if there is a token in request header
    if(!req.headers.authorization) {
      return res.status(401).json({message: "Unauthorized, no token"})
    }

    token = req.headers.authorization.split(' ')[1]

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await User.findById(decoded.id).select('-password')

    if(!user){
      return res.status(401).json({message: "Unauthorized, invalid user"})
    }
    
    // attach user information into the header
    req.user = user
    next()
    
  } catch (error) {
    return res.status(400).json({message: "Unauthorized, invalid credentials"})
  }
}

module.exports = { protected }
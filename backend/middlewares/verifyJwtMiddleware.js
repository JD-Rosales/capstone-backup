const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const verifyJWT = async (req, res, next) => {
  let token;

  if(!req.headers.authorization){ // check if there is no token in request header
    return res.status(401).json({message: "Unauthorized, no token"})
  } else if (!req.headers.authorization.startsWith('Bearer ')) {  // check if authorization header format is correct
    return res.status(401).json({message: "Unauthorized, invalid token"})
  }

  // get the token from request header
  token = req.headers.authorization.split(' ')[1]

  let auth

  // verify token
  try {
    auth = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid token"})
  }

  if(!auth) {
    return res.status(401).json({ message: "Unauthorized"})
  }

  req.auth = auth
  next()

    // return res.status(200).json({auth})
    // let token

    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //   try {
    //     //Get Token from Header
    //     token = req.headers.authorization.split(' ')[1]

    //     //verify token
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    //     //get user from the token
    //     req.user = await User.findById(decoded.id).select('-password')
    //     res.status(200).json({ message: 'Access Granted', isAuthorized: true })
    //     next()
    //   } catch (error) {
    //     res.status(401).json({ message: 'Session expired!', isAuthorized: false })
    //     console.log(error)
    //   }

    // }
    
    // if(!token){
    //   res.status(401).json({ message: 'Unauthorized, no token'})
    // }

}

module.exports = { verifyJWT }
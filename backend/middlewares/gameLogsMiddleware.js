const GameLog = require('../models/gameLogModel')

const saveGameLog = async (req, res, next) => {
  try {

    const userID = req.user.id
    const gameType = req.body.gameType
    
    if(userID && gameType){
      await GameLog.create({
        user: userID,
        gameType: gameType,
      })
    }
    
    next()
  } catch (error) {
    return res.status(400).json({message: "Unauthorized, invalid credentials"})
  }
}

module.exports = { saveGameLog }
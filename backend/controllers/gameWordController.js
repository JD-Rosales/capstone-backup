const GameWord = require('../models/gameWordModel')
const { cloudinary } = require('../config/cloudinary')

const addGameWord = async (req, res) => {
  try {
    let {gameType, word, difficulty, image} = req.body

    word = word.toUpperCase()
    difficulty = difficulty.toUpperCase()

    const auth = req.user
    if(auth.role !== "admin"){
      return res.status(401).json({message: "Unauthorized"})
    }

    if(!gameType || !word || !difficulty){
      return res.status(400).json({message: "Please input all required fields"})
    }

    if(gameType === "fourpiconeword"){
      // function here
      if(!image || image === ""){
        return res.status(400).json({message: "Please select an image"})
      }

      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
      })

      if (uploadResponse.url) { //check if image upload return an image url
        await GameWord.create({
          gameType,
          word,
          image: uploadResponse.url,
          difficulty
        })

        const gameWord = await GameWord.find({ "gameType": gameType })
        return res.status(200).json(gameWord)

      } else {
        return res.status(400).json({ message: "An error has occured!" })
      }


    } else {
      await GameWord.create({
        gameType,
        word,
        difficulty
      })
  
      const gameWord = await GameWord.find({ "gameType": gameType })
  
      return res.status(200).json(gameWord)
    }

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const getGameWord = async (req, res) => {
  try {
    const auth = req.user
    if(auth.role !== "admin"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const gameWord = await GameWord.find({ "gameType": req.params.gameType })

    return res.status(200).json(gameWord)
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const getWords = async(req, res) => {
  try {
    const {gameType, difficulty} = req.body

    if(!gameType || !difficulty){
      return res.status(400).json({message: "An error has occured"})
    }

    const gameWord = await GameWord.find({"gameType": gameType, "difficulty": difficulty})

    return res.status(200).json(gameWord)
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const deleteGameWord = async (req, res) => {
  try {

    const auth = req.user
    
    if(auth.role !== "admin"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const findGameWord = await GameWord.findById(req.params.id)

    if(!findGameWord){
      res.status(404).json({ message: 'ID not found!'})
    }

    await findGameWord.deleteOne()

    const gameWord = await GameWord.find({ "gameType": findGameWord.gameType })

    return res.status(200).json(gameWord)

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const updateGameWord = async (req, res) => {
  try{

    let {gameType, word, difficulty} = req.body

    if(!gameType || !word || !difficulty){
      return res.status(400).json({message: "Please input all required fields"})
    }

    word = word.toUpperCase()
    difficulty = difficulty.toUpperCase()

    const auth = req.user
    if(auth.role !== "admin"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const findGameWord = await GameWord.findById(req.params.id)

    if(!findGameWord){
      return res.status(404).json({message: 'ID not found'})
    }

    await GameWord.findByIdAndUpdate(
      req.params.id, 
      {
        "word": word,
        "difficulty": difficulty,
        "gameType": gameType,
      },
      {new: true}
    )

    const gameWord = await GameWord.find({ "gameType": gameType })

    return res.status(200).json(gameWord)
  } catch (error){
    console.log(error)
    console.log(error);
    return res.status(400).jason({message: "An error has occured"})
  }
} 

module.exports = {
  addGameWord,
  getGameWord,
  deleteGameWord,
  updateGameWord,
  getWords
}
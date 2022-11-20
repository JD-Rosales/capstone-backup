const mongoose = require('mongoose')

const gameWordSchema = mongoose.Schema({
  gameType: {
    type: String,
    require: [true, "Game type is required"]
  },
  word: {
    type: String,
    required: [true, 'Please add a text value']
  },
  image: {
    type: String,
  },
  difficulty: {
    type: String,
    required: [true, 'Please add a text value']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('GameWord', gameWordSchema)
const mongoose = require('mongoose')

const gameLogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  gameType: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('GameLog', gameLogSchema)
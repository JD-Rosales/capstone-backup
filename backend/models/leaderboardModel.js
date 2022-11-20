const mongoose = require('mongoose')

const leaderboardSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  gameType: {
    type: String,
    require: [true, "Game type is required"]
  },
  difficulty: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Leaderboard', leaderboardSchema)
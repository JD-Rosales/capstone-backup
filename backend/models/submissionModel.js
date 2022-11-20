const mongoose = require('mongoose')
const Assignment = require('./assignmentModel')
const User = require('./userModel')

const submissionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Assignment'
  },
  timeLeft: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  late: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Submission', submissionSchema)
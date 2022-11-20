const mongoose = require('mongoose')

let otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otpType: {
    type: String,
    default: "signup"
  },
  otp:{
    type: Number,
    required: true,
},
}, {
  timestamps: true
})

otpSchema.index({updatedAt: 1},{expireAfterSeconds: 450});

module.exports = mongoose.model('Otp', otpSchema)
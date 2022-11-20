const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI)
    // console.log(conn.connections[0]._connectionString)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
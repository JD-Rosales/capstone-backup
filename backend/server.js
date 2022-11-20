const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')
const { verifyJWT } = require('./middlewares/verifyJwtMiddleware')
const { default: mongoose } = require('mongoose')
const port = process.env.PORT || 8000

connectDB()

const app = express()

// app.use(express.json())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended : false}))

app.use(cors({
  origin:["http://localhost:3000"],
  method:["GET", "POST"],
  credentials: true,
}))

app.use('/api/game-word', require('./routes/api/gameWordRoutes'))

app.use('/api/users', require('./routes/api/userRoutes'))

app.use('/api/teacher', require('./routes/api/teacherRoutes'))

app.use('/api/student', require('./routes/api/studentRoutes'))

app.use('/api/assignments', require('./routes/api/assignmentRoutes'))

app.use('/api/submission', require('./routes/api/submissionRoutes'))

app.use('/api/leaderboard', require('./routes/api/leaderboardRoutes'))

app.use('/api/game-logs', require('./routes/api/gameLogRoutes'))

app.use('/api/otp', require('./routes/api/otpRoutes'))

//frontend protected routes
app.use('/verifyJWT', verifyJWT)

//Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(port, () => console.log(`Server running on PORT ${port}`))
})

mongoose.connection.on('error', err => {
  console.log(err)
})
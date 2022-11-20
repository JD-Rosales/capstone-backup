const express = require('express')
const router = express.Router()
const { getEnrolledStudents } = require('../../controllers/studentController')
const { protected } = require('../../middlewares/authMiddleware')

router.get('/get-students/:classCode', protected, getEnrolledStudents)

module.exports = router
const express = require('express')
const router = express.Router()
const { addSubmission, checkSubmission, getSubmissions } = require('../../controllers/submissionController')
const { protected } = require('../../middlewares/authMiddleware')

router.get('/get-submissions/:id', protected, getSubmissions)
router.get('/:id', protected, checkSubmission)
router.post('/', protected, addSubmission)

module.exports = router
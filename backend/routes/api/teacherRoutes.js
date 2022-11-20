const express = require('express')
const router = express.Router()
const { getUnactivated, updateStatus } = require('../../controllers/teachersController')
const { protected } = require('../../middlewares/authMiddleware')

router.get('/get-unactivated', protected, getUnactivated)
router.patch('/update-status/:id', protected, updateStatus)

module.exports = router
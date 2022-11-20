const express = require('express')
const router = express.Router()
const { getGameLogs, addGuesshandsignLog }  = require('../../controllers/gameLogController')
const { protected } = require('../../middlewares/authMiddleware')

router.get('/', protected, getGameLogs)
router.post('/', protected, addGuesshandsignLog)

module.exports = router
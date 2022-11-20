const express = require('express')
const router = express.Router()
const { addLeaderboard, getLeaderboard } = require('../../controllers/leaderBoardController')
const { protected } = require('../../middlewares/authMiddleware')

router.put('/', protected, addLeaderboard)
router.post('/', protected, getLeaderboard)

module.exports = router
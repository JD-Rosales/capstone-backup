const express = require('express')
const router = express.Router()
const { addGameWord, getGameWord, deleteGameWord, updateGameWord, getWords }  = require('../../controllers/gameWordController')
const { protected } = require('../../middlewares/authMiddleware')
const { saveGameLog } = require('../../middlewares/gameLogsMiddleware')

router.post('/', protected, addGameWord)
router.post('/getWords', protected, saveGameLog, getWords)
router.get('/:gameType', protected, getGameWord)
router.delete('/:id', protected, deleteGameWord)
router.patch('/:id', protected, updateGameWord)

module.exports = router
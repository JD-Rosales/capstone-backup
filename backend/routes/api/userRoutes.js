const express = require('express')
const router = express.Router()
const { signUp, login, updateProfile, updateUserSettings, changePassword, deleteAccount, updateProgress } = require('../../controllers/usersController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/', signUp)
router.post('/login', login)
router.patch('/update-profile/:id', protected, updateProfile)
router.patch('/update-progress/:id', protected, updateProgress)
router.patch('/update-userSettings/:id', protected, updateUserSettings)
router.patch('/change-password/:id', protected, changePassword)
router.delete('/delete-account/:id', protected, deleteAccount)

module.exports = router
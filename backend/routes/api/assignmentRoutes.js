const express = require('express')
const router = express.Router()
const { addAssignment, getAssignments, updateAssignment, deleteAssignment } = require('../../controllers/assignmentController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/add-assignment', protected, addAssignment)
router.patch('/update-assignment/:id', protected, updateAssignment)
router.get('/', protected, getAssignments)
router.delete('/:id', protected, deleteAssignment)

module.exports = router
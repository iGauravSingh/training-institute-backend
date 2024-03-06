const express = require('express')
const router = express.Router()

const staffController = require('../controllers/staffController')
const authenticateToken = require('../middlewares/auth')

router.get('/',staffController.getAllStaff)
router.get('/:id',staffController.getOneStaff)
router.post('/',staffController.createStaff)
router.delete('/:id',staffController.deleteStaff)

module.exports = router

const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')
const authenticateToken = require('../middlewares/auth')

router.get('/',eventController.getAllEvent)
router.get('/:id',eventController.getFiveEvent)
router.post('/',eventController.createEvent)
router.delete('/:id',eventController.deleteEvent)

module.exports = router

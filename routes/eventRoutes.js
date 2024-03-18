const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')
const {authenticateToken} = require('../middlewares/auth')

router.get('/',eventController.getAllEvent)
router.post('/',authenticateToken,eventController.createEvent)
router.delete('/:id',authenticateToken,eventController.deleteEvent)

module.exports = router

const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')
const authenticateToken = require('../middlewares/auth')

router.get('/',eventController.getAllEvent)
router.get('/:id',eventController.getOneEvent)
router.post('/',eventController.createEvent)
router.delete('/',eventController.deleteEvent)

module.exports = router

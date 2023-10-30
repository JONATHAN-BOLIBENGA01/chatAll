const express = require('express')
const router = express.Router()
const roomCtrls = require('../controllers/room')


router.get('/', roomCtrls.getRoom)

module.exports = router
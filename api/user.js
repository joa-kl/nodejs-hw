const express = require('express')
const router = express.Router()
const controller = require('../controller/auth')

router.post('/login', controller.login);

router.post('/signup', controller.signup);

router.post('/logout', controller.logout);

router.post('/current', controller.getCurrent);

module.exports = router
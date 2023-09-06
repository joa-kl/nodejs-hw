const express = require('express')
const router = express.Router()
const controller = require('../controller/auth');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

router.post('/login', controller.login);

router.post('/signup', controller.signup);

router.get('/logout', controller.logout);

router.get('/current', auth, controller.getCurrent);

// router.post('/avatars', upload.single('avatar'));

router.patch('/avatars', auth, upload.single('avatar'));

module.exports = router
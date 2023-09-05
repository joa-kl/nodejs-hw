const express = require('express')
const router = express.Router()
const controller = require('../controller/auth');
const upload = require('../middleware/upload');

router.post('/login', controller.login);

router.post('/signup', controller.signup);

router.post('/logout', controller.logout);

router.post('/current', controller.getCurrent);

router.post('/avatars', upload.single('avatar'));

router.patch('/avatars', controller.updateAvatar);

module.exports = router
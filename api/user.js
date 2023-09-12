const express = require('express')
const router = express.Router()
const controller = require('../controller/auth');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const ctrlWrapper = require('../helpers/ctrlWrapper');
// const validateBody = require('../middleware/validateBody');
// const emailController = require('../controller/sendEmail')

router.post('/login', controller.login);

router.post('/signup', controller.signup);

router.get('/logout', auth, controller.logout);

router.get('/current', auth, controller.getCurrent);

router.patch('/avatars', auth, upload.single('avatar'), controller.updateAvatar);

router.get('/verify/:verificationToken', ctrlWrapper(controller.verifyEmail));

router.post('/verify', ctrlWrapper(controller.resendVerifyEmail));

// router.post('/send', emailController.send);


module.exports = router
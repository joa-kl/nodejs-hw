const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const auth = require('../middleware/auth')

router.get('/', auth, controller.getAll);

router.get('/:contactId', auth, controller.getContact);

router.post('/', auth, controller.create);

router.delete('/:contactId', auth, controller.remove);

router.put('/:contactId', auth, controller.update);

router.patch('/:contactId/favorite', auth, controller.updateStatus);

module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../controller/index')

router.get('/', controller.getAll);

router.get('/:contactId', controller.getContact);

router.post('/', controller.create);

router.delete('/:contactId', controller.remove);

router.put('/:contactId', controller.update);

router.patch('/:contactId/favorite', controller.updateStatus);

module.exports = router
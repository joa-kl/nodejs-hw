const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const passport = require('passport')

const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || err) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Unauthorized',
                data: 'Unauthorized',
            })
        }
        req.user = user
        next()
    })(req, res, next)
}


router.get('/', auth, controller.getAll);

router.get('/:contactId', auth, controller.getContact);

router.post('/', controller.create);

router.delete('/:contactId', controller.remove);

router.put('/:contactId', controller.update);

router.patch('/:contactId/favorite', controller.updateStatus);

module.exports = router
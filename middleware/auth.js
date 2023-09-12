const passport = require('passport');

require('dotenv').config();
// const secret = process.env.SECRET;

const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(' ');

    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || err || bearer !== 'Bearer' || user.token !== token) {
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

module.exports = auth;
const jwt = require('jsonwebtoken');
const User = require('../service/schemas/user');

require('dotenv').config();
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
    const { authorisation = "" } = req.headers;
    const [bearer, token] = authorisation.split(' ');

    if (bearer !== 'Bearer') {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Unauthorized',
            data: 'Unauthorized',
        })
    }

    try {
        const { id } = jwt.verify(token, secret);
        const user = await User.findById(id);

        if (!user || !user.token || user.token !== token) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Unauthorized',
                data: 'Unauthorized',
            })
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = auth;
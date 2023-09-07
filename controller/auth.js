const User = require('../service/schemas/user');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const storeImage = path.join(__dirname, '../public');
// const avatarsDir = path.join(__dirname, '../../public/avatars');
// const tempDir = path.join(__dirname, '../../tmp');
const Jimp = require("jimp")


require('dotenv').config();
const secret = process.env.SECRET;

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Incorrect login or password',
            data: 'Bad request'
        });
    }

    const payload = {
        id: user.id,
        user: user.username,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    user.token = token;
    user.save();

    res.json({
        status: 'success',
        code: 200,
        data: {
            token,
        },
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.status(201).json({
        status: 'success',
        code: 201,
        message: 'Logout successful',
    });
}; 

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email }).lean();

    if (user) {
        return res.status(409).json({
            status: 'error',
            code: 409,
            message: 'Email is already in use',
            data: 'Conflict'
        });
    }
    try {
        const newUser = new User({ username, email });
        newUser.setPassword(password);
        await newUser.save();

        res.status(201).json({
            status: 'success',
            code: 201,
            data: { 
                message: 'Registration successful',
            },
        });
    } catch (err) {
        next(err)
    }
}

const getCurrent = async (req, res, next) => {

    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({
                status: "not-found",
                code: 404,
                message: 'not authorized',
                data: {
                    user: req.user,
                },
                
            });
        }
        return res.json({
            status: "success",
            code: 200,
            data: {
                user: req.user,
            },
        
        });
        
    } catch (e) {
        console.error(e);
        next(e);
    }
};


const uploadAvatar = async (req, res, next) => {
    const { description } = req.body;
    const { path: temporaryName, filename } = req.file;
    const fileName = path.join(storeImage, filename);

    try {
        await fs.rename(temporaryName, fileName);
    } catch (err) {
        await fs.unlink(temporaryName);
        return next(err);
    }

    res.json({
        description,
        message: 'File uploaded successfully',
        status: 200,
    })
};

const updateAvatar = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email });
    const { path: temporaryName, filename } = req.file;
    const avatarURL = path.join("public/avatar", filename);

    Jimp.read(temporaryName)
        .then((avatar) => {
            return avatar
                .resize(250, 250)
                .write("public/avatar");
        })
        .catch((err) => {
            console.error(err);
        });

    try {
        await fs.rename(temporaryName, avatarURL);
        user.avatarURL = avatarURL;
        user.save()
    } catch (e) {
        return next(e);
    }
    res.status(200).json({ avatarURL: avatarURL });
}


module.exports = {
    login,
    logout,
    signup,
    getCurrent,
    uploadAvatar,
    updateAvatar
}
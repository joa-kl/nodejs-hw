const { User } = require('../service/schemas/user');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const storeImage = path.join(__dirname, '../public');
const Jimp = require("jimp");
const bcryptjs = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../helpers/sendEmail');


require('dotenv').config()
const secret = process.env.SECRET;
const BASE_URL = process.env.BASE_URL;


const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) {
        return res.json({
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

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.status(409).json({
            status: 'error',
            code: 409,
            message: 'Email is already in use',
            data: 'Conflict'
        });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const avatarUrl = gravatar.url(email);
    const verificationToken = uuidv4();
  

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarUrl,
        verificationToken,
    });

 
    const verifyEmail = {
        to: email,
        subject: 'Registration - verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${newUser.verificationToken}">Click to verify email</a>`,
    }; 

    await sendEmail(verifyEmail);

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatarUrl,
    });

}


const getCurrent = async (req, res, next) => {

    try {
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
  
    const user = await User.findOne({ email: req.user.email});
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

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
        return res.status(404).json({
            status: "Not Found",
            code: 404,
            message: 'User not found',
        })
    }

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken,
    });

    res.json({
        status: 'success',
        code: 200,
        message: "Verification successful"
    })
}

const resendVerifyEmail = async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.json({
            status: 'not found',
            code: 200,
            message: "not found"
        })
    }

    if (user.verify) {
        res.json({
            status: 'success',
            code: 200,
            message: "Verification successful"
        })
    }

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
        message: 'Verification email sent',
    });
};


module.exports = {
    login,
    logout,
    signup,
    getCurrent,
    uploadAvatar,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail
}
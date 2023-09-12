const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bCrypt = require('bcryptjs');
const Joi = require('joi');
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const user = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            match: emailRegexp,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        avatarURL: {
            type: String,
            // required: true,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },
    }
)

user.methods.setPassword = function (password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(5))
}

user.methods.validPassword = function (password) {
    return bCrypt.compareSync(password, this.password)
}

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

const User = mongoose.model('user', user);

const schemas = {
    emailSchema
}

module.exports = {
    User,
    schemas
}
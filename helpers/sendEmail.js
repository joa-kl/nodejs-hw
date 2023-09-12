const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');


require('dotenv').config();

const config = {
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
};

const sendEmail = async ({ to, subject, html, text }) => {
    const transporter = nodemailer.createTransport(config);
    const verificationToken = uuidv4();
    const BASE_URL = process.env.BASE_URL;
    const emailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
        text
    }; 
    
    return await transporter.sendMail(emailOptions);
}


module.exports = {
    sendEmail,
};


const nodemailer = require('nodemailer');

require('dotenv').config();

const config = {
    // pool: true,
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
};

const sendEmail = async ({ to, subject, text }) => {
    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        text
    }; 

    return await transporter.sendMail(emailOptions);
}


module.exports = {
    sendEmail,
};


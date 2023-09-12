const emailService = require("../helpers/sendEmail");

const send = async (req, res) => {
    try {
        const result = await emailService.sendEmail(req.body);
        return res.json({
            status: "success",
            data: result,
            message: "Email sent successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status: "error",
            data: err,
            message: "Failed to send an email",
        });
    }
};

module.exports = {
    send,
};
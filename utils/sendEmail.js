const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.PASS
        }
    });

    const mailOptions = {
        from: `"Shop API" <${process.env.SMTP_EMAIL}>`,
        to, 
        subject, 
        html
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
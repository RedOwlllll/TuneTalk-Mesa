const nodemailer = require("nodemailer");

const NotificationTransporter = () => {
    const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "skk8822@autuni.ac.nz",
        pass: "*******",
        },
    });
    return transporter;
};

module.exports = { NotificationTransporter };
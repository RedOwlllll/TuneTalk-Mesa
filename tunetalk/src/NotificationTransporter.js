const nodemailer = require("nodemailer");

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "skk8822@autuni.ac.nz",
        pass: "tabitoyroom8",
        },
    });
    return transporter;
};

module.exports = { createMailTransporter };
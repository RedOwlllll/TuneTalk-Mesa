const nodemailer = require('nodemailer');

//Email content in HTML format
const html = `
    <h1>!TIME TO POST ON TUNETALK!<h1>
    <p>Time to post the song you are currently listening to or have recently played</p>
`;

//Function to send email
async function main()
{
    const transporter = nodeMailer.createTransport({
        host: 'tabithakay1004@gmail.com',
        port: 465,
        secure: true,
        auth:
        {
            user: 'skk8822@autuni.ac.nz',
            pass: 'need to double check'
        }
    });

    const info = await transporter.sendMail({
        from: 'Tabitha <tabithakay1004@gmail.com',
        to: 'skk8822@autuni.ac.nz',
        subject: 'Time to post on the TuneTalk app or else',
        html: html,
    });

    console.log("Message sent: " + info.messageId);
}

main()
.catch(e => console.log(e));
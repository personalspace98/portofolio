const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

exports.sendEmail = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        functions.logger.log('req.body', req.body);
        const email = req.body.emailFrom;
        const subject = req.body.subject;
        const message = req.body.message;
        const name = req.body.name;

        await mail(message, subject, email, name);
        return res.status(201).json('succeed').end();
    });
});


async function mail(message, subject, emailFrom, name) {
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: '',
            pass: '',
        },
    });

    // send mail with defined transport object
    message += `<br><br>Email from: ${emailFrom}, Name: ${name}`
    const info = await transporter.sendMail({
        from: emailFrom, // sender address
        to: 'joepvdpol1998@gmail.com'
        subject: subject, // Subject line
        html: message,
    });

    functions.logger.log('Message sent: %s', info.messageId);
}


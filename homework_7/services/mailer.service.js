const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const {join} = require('path');

const {
    PRODUCTS_LINK,
    ROOT_EMAIL,
    ROOT_EMAIL_HOST,
    ROOT_EMAIL_PORT,
    ROOT_EMAIL_PASS,
    ROOT_EMAIL_SECURE,
    OWU_WEBSITE
} = require('../config');
const htmlTemplates = require('../email-templates');

const transporter = nodemailer.createTransport({
    host: ROOT_EMAIL_HOST,
    port: ROOT_EMAIL_PORT,
    secure: ROOT_EMAIL_SECURE,
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASS,
    },
});

const emailTemplate = new EmailTemplates( {
    message: null,
    views: {
        root: join(process.cwd(), 'email-templates'),
    }
})

class MailerService {
    async sendMail(userMail, action, context) {
        const templateInfo = htmlTemplates[action];
        const html = await emailTemplate.render(templateInfo.templateFileName, {
            ...context,
            owuUrl: OWU_WEBSITE,
            productsLink: PRODUCTS_LINK
        })

        const mailOptions = {
            from: ROOT_EMAIL,
            to: userMail,
            subject: templateInfo.subject,
            html
        };

        return transporter.sendMail(mailOptions);
    }
}

module.exports = new MailerService();
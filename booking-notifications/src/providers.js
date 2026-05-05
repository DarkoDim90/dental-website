const { Resend } = require('resend');
const twilio = require('twilio');

function createProviders(config) {
    const resend = config.email.apiKey ? new Resend(config.email.apiKey) : null;
    const twilioClient =
        config.sms.accountSid && config.sms.authToken
            ? twilio(config.sms.accountSid, config.sms.authToken)
            : null;

    async function sendEmail(to, subject, text) {
        if (!to || !config.sendEmail) return { skipped: true, reason: 'email disabled or missing recipient' };
        if (!resend) return { skipped: true, reason: 'resend not configured' };

        await resend.emails.send({
            from: config.email.from,
            to,
            subject,
            text
        });

        return { sent: true };
    }

    async function sendSms(to, body) {
        if (!to || !config.sendSms) return { skipped: true, reason: 'sms disabled or missing recipient' };
        if (!twilioClient || !config.sms.from) return { skipped: true, reason: 'twilio not configured' };

        await twilioClient.messages.create({
            from: config.sms.from,
            to,
            body
        });

        return { sent: true };
    }

    return {
        sendEmail,
        sendSms
    };
}

module.exports = {
    createProviders
};

const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

function asBool(value, fallback) {
    if (value === undefined || value === null || value === '') return fallback;
    return String(value).toLowerCase() === 'true';
}

function asListOfInts(value, fallback) {
    const raw = value || fallback;
    return String(raw)
        .split(',')
        .map((s) => Number.parseInt(s.trim(), 10))
        .filter((n) => Number.isFinite(n) && n > 0)
        .sort((a, b) => b - a);
}

const rootDir = path.join(__dirname, '..');

module.exports = {
    port: Number.parseInt(process.env.PORT || '8787', 10),
    timezone: process.env.TIMEZONE || 'Europe/Skopje',
    baseUrl: (process.env.BASE_URL || 'http://localhost:8787').replace(/\/$/, ''),
    webhookToken: process.env.WEBHOOK_TOKEN || '',
    defaultLanguage: process.env.DEFAULT_LANGUAGE || 'mk',
    sendEmail: asBool(process.env.SEND_EMAIL, true),
    sendSms: asBool(process.env.SEND_SMS, true),
    clinic: {
        name: process.env.CLINIC_NAME || 'Dental Rhapsody',
        phone: process.env.CLINIC_PHONE || '+38978279493',
        email: process.env.CLINIC_EMAIL || 'contact@dentalrhapsody.com.mk'
    },
    email: {
        apiKey: process.env.RESEND_API_KEY || '',
        from: process.env.EMAIL_FROM || 'Dental Rhapsody <noreply@dentalrhapsody.com.mk>'
    },
    sms: {
        accountSid: process.env.TWILIO_ACCOUNT_SID || '',
        authToken: process.env.TWILIO_AUTH_TOKEN || '',
        from: process.env.TWILIO_FROM || ''
    },
    reminderHours: asListOfInts(process.env.REMINDER_HOURS, '24,2'),
    dataFilePath: path.join(rootDir, 'data', 'appointments.json')
};

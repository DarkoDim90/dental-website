const cron = require('node-cron');
const config = require('./config');
const { createProviders } = require('./providers');
const { getDueReminders, markReminderSent } = require('./store');
const { reminderTemplateMk } = require('./templates');

const providers = createProviders(config);

async function processDueReminders() {
    const due = getDueReminders(config.dataFilePath, config.reminderHours);

    for (const item of due) {
        const row = item.row;
        const hoursBefore = item.hoursBefore;
        const content = reminderTemplateMk(row, config.clinic, config.timezone, hoursBefore);

        try {
            if (row.email) {
                const emailResult = await providers.sendEmail(row.email, content.emailSubject, content.emailText);
                if (emailResult.sent) markReminderSent(config.dataFilePath, row.externalId, hoursBefore, 'email');
            }

            if (row.phone) {
                const smsResult = await providers.sendSms(row.phone, content.smsText);
                if (smsResult.sent) markReminderSent(config.dataFilePath, row.externalId, hoursBefore, 'sms');
            }

            console.log(`Processed reminder for appointment ${row.externalId} (${hoursBefore}h)`);
        } catch (err) {
            console.error(`Failed reminder for appointment ${row.externalId}`, err);
        }
    }
}

cron.schedule('* * * * *', () => {
    processDueReminders().catch((err) => {
        console.error('Reminder cycle failed', err);
    });
});

console.log('Reminder scheduler started. Checking every minute.');
processDueReminders().catch((err) => {
    console.error('Initial reminder cycle failed', err);
});

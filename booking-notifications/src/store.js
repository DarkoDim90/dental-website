const fs = require('fs');
const path = require('path');

function ensureFile(dataFilePath) {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(dataFilePath)) fs.writeFileSync(dataFilePath, '[]\n', 'utf8');
}

function loadAll(dataFilePath) {
    ensureFile(dataFilePath);
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (_err) {
        return [];
    }
}

function saveAll(dataFilePath, rows) {
    fs.writeFileSync(dataFilePath, JSON.stringify(rows, null, 2) + '\n', 'utf8');
}

function upsertAppointment(dataFilePath, appointment) {
    const rows = loadAll(dataFilePath);
    const nowIso = new Date().toISOString();
    const idx = rows.findIndex((r) => r.externalId === appointment.externalId);

    if (idx >= 0) {
        rows[idx] = {
            ...rows[idx],
            ...appointment,
            notifications: rows[idx].notifications || {
                confirmation: {},
                reminders: {}
            },
            updatedAt: nowIso
        };
    } else {
        rows.push({
            ...appointment,
            notifications: {
                confirmation: {},
                reminders: {}
            },
            createdAt: nowIso,
            updatedAt: nowIso
        });
    }

    saveAll(dataFilePath, rows);
    return rows[idx >= 0 ? idx : rows.length - 1];
}

function markConfirmationSent(dataFilePath, externalId, channel) {
    const rows = loadAll(dataFilePath);
    const row = rows.find((r) => r.externalId === externalId);
    if (!row) return;

    row.notifications = row.notifications || { confirmation: {}, reminders: {} };
    row.notifications.confirmation = row.notifications.confirmation || {};
    row.notifications.confirmation[`${channel}SentAt`] = new Date().toISOString();
    row.updatedAt = new Date().toISOString();

    saveAll(dataFilePath, rows);
}

function hasConfirmationBeenSent(row, channel) {
    return Boolean(
        row && row.notifications && row.notifications.confirmation && row.notifications.confirmation[`${channel}SentAt`]
    );
}

function markReminderSent(dataFilePath, externalId, hoursBefore, channel) {
    const rows = loadAll(dataFilePath);
    const row = rows.find((r) => r.externalId === externalId);
    if (!row) return;

    row.notifications = row.notifications || { confirmation: {}, reminders: {} };
    row.notifications.reminders = row.notifications.reminders || {};
    row.notifications.reminders[String(hoursBefore)] = row.notifications.reminders[String(hoursBefore)] || {};
    row.notifications.reminders[String(hoursBefore)][`${channel}SentAt`] = new Date().toISOString();
    row.updatedAt = new Date().toISOString();

    saveAll(dataFilePath, rows);
}

function getDueReminders(dataFilePath, reminderHours) {
    const rows = loadAll(dataFilePath);
    const now = Date.now();

    const due = [];

    for (const row of rows) {
        if (!row || !row.startAt) continue;
        if (String(row.status || '').toLowerCase().includes('cancel')) continue;

        const startMs = new Date(row.startAt).getTime();
        if (!Number.isFinite(startMs)) continue;
        if (startMs <= now) continue;

        for (const hoursBefore of reminderHours) {
            const triggerMs = startMs - hoursBefore * 60 * 60 * 1000;
            const wasSent =
                row.notifications &&
                row.notifications.reminders &&
                row.notifications.reminders[String(hoursBefore)] &&
                (row.notifications.reminders[String(hoursBefore)].emailSentAt ||
                    row.notifications.reminders[String(hoursBefore)].smsSentAt);

            if (!wasSent && now >= triggerMs) {
                due.push({ row, hoursBefore });
            }
        }
    }

    return due;
}

module.exports = {
    loadAll,
    upsertAppointment,
    markConfirmationSent,
    hasConfirmationBeenSent,
    markReminderSent,
    getDueReminders
};

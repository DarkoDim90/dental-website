const express = require('express');
const config = require('./config');
const { createProviders } = require('./providers');
const {
    loadAll,
    upsertAppointment,
    markConfirmationSent,
    hasConfirmationBeenSent
} = require('./store');
const { confirmationTemplateMk } = require('./templates');

const app = express();
const providers = createProviders(config);

app.use(express.json({ limit: '1mb' }));

function pickFirst(source, paths) {
    for (const p of paths) {
        const value = p.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), source);
        if (value !== undefined && value !== null && value !== '') return value;
    }
    return undefined;
}

function normalizeAppointment(payload) {
    const appointmentNode = payload.appointment || payload.data || payload;

    const externalId =
        String(
            pickFirst(appointmentNode, ['id', 'appointment_id', 'booking_id', 'key']) ||
            pickFirst(payload, ['id', 'appointment_id']) ||
            ''
        ) || `unknown-${Date.now()}`;

    const startAt = pickFirst(appointmentNode, ['start_at', 'start_time', 'start', 'starts_at', 'date_time']);
    const endAt = pickFirst(appointmentNode, ['end_at', 'end_time', 'end', 'ends_at']);

    const patientName =
        pickFirst(appointmentNode, ['customer.name', 'client.name', 'patient.name', 'name']) ||
        [
            pickFirst(appointmentNode, ['customer.first_name', 'client.first_name', 'patient.first_name']),
            pickFirst(appointmentNode, ['customer.last_name', 'client.last_name', 'patient.last_name'])
        ]
            .filter(Boolean)
            .join(' ') ||
        'Пациент';

    const email = pickFirst(appointmentNode, ['customer.email', 'client.email', 'patient.email', 'email']);
    const phone = pickFirst(appointmentNode, ['customer.phone', 'client.phone', 'patient.phone', 'phone']);
    const service = pickFirst(appointmentNode, ['service.name', 'service', 'service_name', 'category']);

    const status = String(
        pickFirst(appointmentNode, ['status']) || pickFirst(payload, ['event', 'type']) || 'confirmed'
    ).toLowerCase();

    return {
        externalId,
        source: 'setmore',
        patientName,
        email,
        phone,
        service,
        startAt,
        endAt,
        status,
        language: 'mk'
    };
}

function requireWebhookToken(req, res, next) {
    if (!config.webhookToken) return next();

    const incoming = req.header('x-webhook-token') || '';
    if (incoming !== config.webhookToken) {
        return res.status(401).json({ ok: false, error: 'unauthorized webhook token' });
    }

    return next();
}

app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'booking-notifications' });
});

app.get('/appointments', (_req, res) => {
    const rows = loadAll(config.dataFilePath);
    res.json({ ok: true, count: rows.length, data: rows });
});

app.post('/webhooks/setmore', requireWebhookToken, async (req, res) => {
    try {
        const normalized = normalizeAppointment(req.body || {});
        const saved = upsertAppointment(config.dataFilePath, normalized);

        if (!saved.startAt || String(saved.status).includes('cancel')) {
            return res.json({ ok: true, skipped: true, reason: 'cancelled or missing startAt' });
        }

        const content = confirmationTemplateMk(saved, config.clinic, config.timezone);

        if (saved.email && !hasConfirmationBeenSent(saved, 'email')) {
            const emailResult = await providers.sendEmail(saved.email, content.emailSubject, content.emailText);
            if (emailResult.sent) markConfirmationSent(config.dataFilePath, saved.externalId, 'email');
        }

        if (saved.phone && !hasConfirmationBeenSent(saved, 'sms')) {
            const smsResult = await providers.sendSms(saved.phone, content.smsText);
            if (smsResult.sent) markConfirmationSent(config.dataFilePath, saved.externalId, 'sms');
        }

        return res.json({ ok: true, appointmentId: saved.externalId });
    } catch (err) {
        console.error('Webhook processing error', err);
        return res.status(500).json({ ok: false, error: 'webhook processing failed' });
    }
});

app.listen(config.port, () => {
    console.log(`booking-notifications listening on http://localhost:${config.port}`);
    console.log(`webhook endpoint: ${config.baseUrl}/webhooks/setmore`);
});

function formatDateTime(isoString, timezone, locale) {
    try {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat(locale, {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: timezone
        }).format(date);
    } catch (_err) {
        return isoString;
    }
}

function confirmationTemplateMk(appointment, clinic, timezone) {
    const when = formatDateTime(appointment.startAt, timezone, 'mk-MK');
    const patient = appointment.patientName || 'Пациент';
    const service = appointment.service || 'Стоматолошка услуга';

    return {
        emailSubject: `Потврда за термин - ${clinic.name}`,
        emailText:
            `Здраво ${patient},\n\n` +
            `Вашиот термин е потврден.\n` +
            `Услуга: ${service}\n` +
            `Датум и време: ${when}\n\n` +
            `Ако сакате да промените термин, јавете се на ${clinic.phone}.\n\n` +
            `Со почит,\n${clinic.name}`,
        smsText:
            `${clinic.name}: Потврден термин за ${service} на ${when}. За промена јавете се на ${clinic.phone}.`
    };
}

function reminderTemplateMk(appointment, clinic, timezone, hoursBefore) {
    const when = formatDateTime(appointment.startAt, timezone, 'mk-MK');
    const patient = appointment.patientName || 'Пациент';
    const service = appointment.service || 'стоматолошка услуга';

    return {
        emailSubject: `Потсетник за термин - ${clinic.name}`,
        emailText:
            `Здраво ${patient},\n\n` +
            `Ова е потсетник дека имате термин за ${service} за ${hoursBefore} часа.\n` +
            `Датум и време: ${when}\n\n` +
            `Ако треба промена, контактирајте не на ${clinic.phone}.\n\n` +
            `Со почит,\n${clinic.name}`,
        smsText:
            `${clinic.name}: Потсетник - термин за ${service} за ${hoursBefore}ч. (${when}). Контакт: ${clinic.phone}`
    };
}

module.exports = {
    confirmationTemplateMk,
    reminderTemplateMk
};

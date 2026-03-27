# Dental Rhapsody — Static Website

A fully responsive, bilingual (English & Macedonian) 5-page static website for a dental office. No build tools or backend required.

## File Structure

```
dental-website/
├── index.html               Homepage (hero, services preview, testimonials, CTA)
├── services.html            Full services listing
├── team.html                Meet the team
├── contact.html             Contact form, office hours, map
├── appointments.html        Online booking via Calendly embed
├── README.md                This file
└── mk/                      Macedonian (МКД) language version
    ├── index.html           Почетна (Homepage)
    ├── services.html        Услуги (Services)
    ├── team.html            Тим (Team)
    ├── contact.html         Контакт (Contact)
    └── appointments.html    Термини (Appointments)
```

---

## Tech Stack

| Tool | Purpose | Cost |
|---|---|---|
| [Tailwind CSS CDN](https://cdn.tailwindcss.com) | All styling | Free |
| [Alpine.js CDN](https://alpinejs.dev) | Mobile menu toggle | Free |
| [Font Awesome 6 CDN](https://fontawesome.com) | Icons | Free |
| [Calendly](https://calendly.com) | Online booking widget | Free tier |
| [Formspree](https://formspree.io) | Contact form backend | Free (50/mo) |
| [GitHub Pages](https://pages.github.com) / [Netlify](https://netlify.com) | Hosting | Free |

---

## Bilingual Support (EN / МКД)

The site ships with a full Macedonian translation under `mk/`. Every page contains a **language switcher** in the navigation bar (top-right), letting visitors toggle between English and Macedonian.

- English pages live at the project root (`index.html`, `services.html`, …)
- Macedonian pages live under `mk/` (`mk/index.html`, `mk/services.html`, …)
- Both language trees are structurally identical — any content or layout change should be applied to **both** sets of files.

---

## Setup Checklist

### 1. Customize content

The following real practice details are already in all HTML files:

| Field | Current value |
|---|---|
| Practice name | `Dental Rhapsody` |
| Address | `Jani Lukrovski No.5` |
| Phone | `+389 (0)78/279-493` |
| Email | `contact@dentalrhapsody.com.mk` |
| Lead dentist | `Dr. Dragana Dimitrievska, DDS` |
| Founded / copyright year | `2026` |

If any of the above need to change, search all HTML files (both root and `mk/`) and replace the value.

### 2. Set up the contact form (Formspree)

1. Sign up at **<https://formspree.io>** (free, no credit card)
2. Create a new form → you'll get a form ID like `xabcdefg`
3. In **both** `contact.html` and `mk/contact.html`, replace:

   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

   with your actual form ID:

   ```html
   action="https://formspree.io/f/xabcdefg"
   ```

4. Form submissions will be emailed directly to you.

### 3. Set up online booking (Calendly)

1. Sign up at **<https://calendly.com>** (free tier available)
2. Connect your Google Calendar or Outlook
3. Create one or more **Event Types** (e.g. "New Patient Exam", "Teeth Cleaning", "Consultation")
4. Set your availability window in Calendly
5. In **both** `appointments.html` and `mk/appointments.html`, replace:

   ```html
   data-url="https://calendly.com/YOUR_USERNAME/appointment?..."
   ```

   with your real Calendly URL:

   ```html
   data-url="https://calendly.com/dental-rhapsody/new-patient?hide_gdpr_banner=1&primary_color=2563eb"
   ```

6. Patients who book will receive automatic confirmation + reminder emails.

### 4. Add your Google Maps embed

1. Open **Google Maps** and search your practice address
2. Click **Share** → **Embed a map** → Copy the `src` URL
3. In **both** `contact.html` and `mk/contact.html`, replace the `src` in the `<iframe>` with your real URL.

### 5. Update social media links

In the footer of each page (both root and `mk/`), update the `href="#"` on the Facebook, Instagram, and Google links to your real profile URLs.

### 6. Add real team photos

The team cards currently use initials as placeholders. To add real photos:

- Replace the `<div>` with initials with an `<img>` tag:

  ```html
  <img src="images/dr-dimitrievska.jpg" alt="Dr. Dragana Dimitrievska" class="w-24 h-24 rounded-full object-cover" />
  ```

- Store photos in an `images/` folder next to the HTML files.
- Apply the same change in `mk/team.html`.

---

## Hosting (Free Options)

### Option A: GitHub Pages (recommended, free forever)

1. Create a free account at **<https://github.com>**
2. Create a new repository (e.g. `dental-rhapsody`)
3. Upload all HTML files **including the `mk/` folder** to the repo
4. Go to **Settings → Pages** → Source: `main` branch → `/ (root)`
5. Your site goes live at `https://yourusername.github.io/dental-rhapsody/`
6. Optional: connect a custom domain (e.g. `www.dentalrhapsody.com.mk`) for ~$10–15/year

### Option B: Netlify (drag & drop, free)

1. Go to **<https://netlify.com>** and sign up free
2. Drag your `dental-website/` folder onto the Netlify deploy area (the `mk/` subfolder is included automatically)
3. Your site is live instantly at a random `*.netlify.app` URL
4. Optional: connect a custom domain (e.g. `www.dentalrhapsody.com.mk`) in Netlify settings

---

## Maintenance Tips

- **To edit text**: Open the relevant `.html` file in any text editor and change the content. Remember to apply the same change to the `mk/` counterpart.
- **To add a new service**: Copy an existing service block in `services.html` and paste/modify it. Do the same in `mk/services.html`.
- **To add a team member**: Copy a team card block in `team.html` and update it. Do the same in `mk/team.html`.
- **Re-deploy after edits**: On GitHub Pages, commit the changed file. On Netlify, drag the folder again or use Netlify's Git integration for automatic deploys.

---

## Upgrading Later (if needed)

If the practice grows and you need more features, you can migrate to:

- **WordPress + WP Dental theme** — more features, ~$20/month hosting
- **Squarespace or Wix Dental templates** — visual editor, ~$16–23/month
- **Custom CMS** — full control, requires a developer

For a small practice, this static site approach is the best value.

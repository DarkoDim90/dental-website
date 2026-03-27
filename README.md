# Bright Smile Dental — Static Website

A fully responsive, 5-page static website for a dental office. No build tools or backend required.

## File Structure

```
dental-website/
├── index.html          Homepage (hero, services preview, testimonials, CTA)
├── services.html       Full services listing
├── team.html           Meet the team
├── contact.html        Contact form, office hours, map
├── appointments.html   Online booking via Calendly embed
└── README.md           This file
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

## Setup Checklist

### 1. Customize content

Search for these placeholder values across all HTML files and replace them:

| Placeholder | Replace with |
|---|---|
| `Bright Smile Dental` | Your practice name |
| `123 Smile Street, Suite 100, Your City, ST 12345` | Your real address |
| `(555) 123-4567` | Your real phone number |
| `hello@brightsmile.com` | Your real email |
| `2010` (founded year) | Your founding year |
| `2026` (footer copyright) | Current year |
| Doctor/staff names and bios | Your real team info |

### 2. Set up the contact form (Formspree)

1. Sign up at **<https://formspree.io>** (free, no credit card)
2. Create a new form → you'll get a form ID like `xabcdefg`
3. In `contact.html`, replace:

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
5. In `appointments.html`, replace:

   ```html
   data-url="https://calendly.com/YOUR_USERNAME/appointment?..."
   ```

   with your real Calendly URL:

   ```html
   data-url="https://calendly.com/brightsmile-dental/new-patient?hide_gdpr_banner=1&primary_color=2563eb"
   ```

6. Patients who book will receive automatic confirmation + reminder emails.

### 4. Add your Google Maps embed

1. Open **Google Maps** and search your practice address
2. Click **Share** → **Embed a map** → Copy the `src` URL
3. In `contact.html`, replace the `src` in the `<iframe>` with your real URL.

### 5. Update social media links

In the footer of each page, update the `href="#"` on the Facebook, Instagram, and Google links to your real profile URLs.

### 6. Add real team photos

The team cards currently use initials as placeholders. To add real photos:

- Replace the `<div>` with initials with an `<img>` tag:

  ```html
  <img src="images/dr-smith.jpg" alt="Dr. Emily Smith" class="w-24 h-24 rounded-full object-cover" />
  ```

- Store photos in an `images/` folder next to the HTML files.

---

## Hosting (Free Options)

### Option A: GitHub Pages (recommended, free forever)

1. Create a free account at **<https://github.com>**
2. Create a new repository (e.g. `brightsmile-dental`)
3. Upload all HTML files to the repo
4. Go to **Settings → Pages** → Source: `main` branch → `/ (root)`
5. Your site goes live at `https://yourusername.github.io/brightsmile-dental/`
6. Optional: connect a custom domain (e.g. `www.brightsmiledelta.com`) for ~$10–15/year

### Option B: Netlify (drag & drop, free)

1. Go to **<https://netlify.com>** and sign up free
2. Drag your `dental-website/` folder onto the Netlify deploy area
3. Your site is live instantly at a random `*.netlify.app` URL
4. Optional: connect a custom domain in Netlify settings

---

## Maintenance Tips

- **To edit text**: Open the relevant `.html` file in any text editor and change the content.
- **To add a new service**: Copy an existing service block in `services.html` and paste/modify it.
- **To add a team member**: Copy a team card block in `team.html` and update it.
- **Re-deploy after edits**: On GitHub Pages, commit the changed file. On Netlify, drag the folder again or use Netlify's Git integration for automatic deploys.

---

## Upgrading Later (if needed)

If the practice grows and you need more features, you can migrate to:

- **WordPress + WP Dental theme** — more features, ~$20/month hosting
- **Squarespace or Wix Dental templates** — visual editor, ~$16–23/month
- **Custom CMS** — full control, requires a developer

For a small practice, this static site approach is the best value.

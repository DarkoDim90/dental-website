# Dental Rhapsody — Static Dental Website

A fully responsive, bilingual (English & Macedonian) static website for a dental office. No build tools or backend required.

## File Structure

```
dental-website/
├── images/
│   ├── office/              Office photos (add real photos here)
│   └── before-after/        Before/after patient photo pairs (add here when ready)
├── logo/                    Brand logos
│   └── logo.png             Logo used in navbar and footer
├── en/                      English language version
│   ├── index.html           Homepage (hero, services preview, testimonials, CTA)
│   ├── services.html        Full services listing
│   ├── team.html            Meet the team
│   ├── gallery.html         Photo gallery (office photos + before/after slider)
│   ├── contact.html         Contact form, office hours, map
│   └── appointments.html    Online booking via Cal.eu embed
├── mk/                      Macedonian (МКД) language version
│   ├── index.html           Почетна (Homepage)
│   ├── services.html        Услуги (Services)
│   ├── team.html            Тим (Team)
│   ├── gallery.html         Галерија (Gallery)
│   ├── contact.html         Контакт (Contact)
│   └── appointments.html    Термини (Appointments)
├── index.html               Root redirect (→ mk/ by default)
└── README.md                This file
```

---

## Tech Stack

| Tool | Purpose | Cost |
| --- | --- | --- |
| [Tailwind CSS CDN](https://cdn.tailwindcss.com) | All styling | Free |
| [Alpine.js CDN](https://alpinejs.dev) | Mobile menu, gallery tabs, before/after slider | Free |
| [Font Awesome 6 CDN](https://fontawesome.com) | Icons | Free |
| [Cal.eu](https://cal.eu) | Online booking widget | Free tier available |
| [Formspree](https://formspree.io) | Contact form backend | Free (50/mo) |
| [GitHub Pages](https://pages.github.com) | Hosting | Free |

---

## Bilingual Support (EN / МКД)

The site ships with a full Macedonian translation under `mk/`. Every page contains a **language switcher** in the navigation bar (top-right), letting visitors toggle between English and Macedonian.

- English pages live under `en/` (`en/index.html`, `en/services.html`, …)
- Macedonian pages live under `mk/` (`mk/index.html`, `mk/services.html`, …)
- The root `index.html` is a minimal redirect that sends visitors to `mk/` by default.
- Both language trees are structurally identical — any content or layout change should be applied to **both** sets of files.

---

## Setup Checklist

### 1. Customize content

The following real practice details are already in all HTML files:

| Field | Current value |
| --- | --- |
| Practice name | `Dental Rhapsody` |
| Address | `Jani Lukrovski No.5, Unit 7` |
| Phone | `+389(0)76/239-850` |
| Email | `dentalrhapsody@outlook.com` |
| Lead dentist | `Dr. Dragana Dimitrievska, DDS` |
| Founded / copyright year | `2026` |

If any of the above need to change, search all HTML files and replace the value in **both** `en/` and `mk/`.

#### Office Hours

Hours are hardcoded in two places across every page:

1. **Contact page detailed table** — `en/contact.html` and `mk/contact.html` (the Office Hours card in the page body)
2. **Footer table** — every page's `<footer>` section (the "Office Hours" / "Работно Време" mini-table)

Current schedule:

| Day | Hours |
| --- | --- |
| Monday, Friday | 07:00 – 15:00 |
| Tuesday, Wednesday | 12:00 – 20:00 |
| Thursday — 1st & last of month | 07:00 – 15:00 |
| Thursday — 2nd & 3rd of month | 12:00 – 20:00 |
| Saturday, Sunday | Closed |

To update hours, search all HTML files for `Office Hours` (EN) and `Работно Време` (МКД) and update the matching rows in both the contact page table and the footer table on every page.

### 2. Set up the contact form (Formspree)

1. Sign up at **<https://formspree.io>** (free, no credit card)
2. Create a new form → you'll get a form ID like `xabcdefg`
3. In **both** `en/contact.html` and `mk/contact.html`, replace:

   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

   with your actual form ID:

   ```html
   action="https://formspree.io/f/xabcdefg"
   ```

4. Form submissions will be emailed directly to you.

### 3. Manage online booking (Cal.eu)

The booking widget on `en/appointments.html` (and `mk/appointments.html`) embeds the Cal.eu calendar for `dental-rhapsody`.

To manage your booking settings:

1. Log in at **<https://cal.eu>**
2. Configure your **Event types** (e.g. Checkup, Filling)
3. Set your **Availability** (working hours, days off)
4. All confirmations and reminders are handled by Cal.eu

### 4. Add your Google Maps embed

1. Open **Google Maps** and search your practice address
2. Click **Share** → **Embed a map** → Copy the `src` URL
3. In **both** `en/contact.html` and `mk/contact.html`, replace the `src` in the `<iframe>` with your real URL.

### 5. Update social media links

In the footer of each page, update the Facebook and Instagram `href` values to your real profile URLs:

```html
<a href="https://www.facebook.com/DentalRhapsody" ...>
<a href="https://www.instagram.com/dental_rhapsody" ...>
```

### 6. Add real team photos

The team cards currently use initials as placeholders. To add real photos:

- Replace the `<div>` with initials with an `<img>` tag.

  In `en/team.html` and `mk/team.html`:

  ```html
  <img src="../images/dr-dimitrievska.jpg" alt="Dr. Dragana Dimitrievska" class="w-24 h-24 rounded-full object-cover" />
  ```

- Drop photo files into the `images/` folder at the project root.

---

## Adding Gallery Photos

The gallery page (`en/gallery.html` / `mk/gallery.html`) has two tabs: **Our Office** and **Before & After**. Both are driven by JavaScript arrays in a `<script>` block at the bottom of each file.

### Office photos

**Recommended image size:** 800 × 600 px, JPEG, under 300 KB each.

1. Drop photo files into `images/office/` (e.g. `reception.jpg`, `treatment-room-1.jpg`).
2. Open **both** `en/gallery.html` and `mk/gallery.html`.
3. Find the `officePhotos` array inside the `<script>` block near the bottom of the file:

   ```js
   officePhotos: [
       {
           src: 'https://placehold.co/800x600/...', // ← replace with real path
           caption: 'Reception & Waiting Area'
       },
       ...
   ],
   ```

4. Replace each `src` value with the actual image path relative to the HTML file:

   ```js
   { src: '../images/office/reception.jpg',        caption: 'Reception & Waiting Area' },
   { src: '../images/office/treatment-room-1.jpg', caption: 'Treatment Room 1' },
   { src: '../images/office/treatment-room-2.jpg', caption: 'Treatment Room 2' },
   { src: '../images/office/sterilisation.jpg',    caption: 'Sterilisation Room' },
   { src: '../images/office/xray.jpg',             caption: 'Digital X-Ray Room' },
   { src: '../images/office/entrance.jpg',         caption: 'Clinic Entrance' },
   ```

5. Update `caption` values (and their Macedonian translations in `mk/gallery.html`) as needed.
6. To add more photos, simply add more `{ src, caption }` objects to the array — the grid expands automatically.

---

### Before & After photos

The Before & After tab is **currently commented out** while patient photos are not yet available. To enable it:

**Step 1 — Prepare the images**

- Name files consistently: `case-01-before.jpg` / `case-01-after.jpg`, `case-02-before.jpg` / `case-02-after.jpg`, etc.
- Recommended size: **800 × 600 px**, JPEG. Both images in a pair must be the **same dimensions**.
- Drop them into `images/before-after/`.
- Obtain **written patient consent** before publishing any photo.

**Step 2 — Uncomment the tab button**

In both `en/gallery.html` and `mk/gallery.html`, remove the comment markers from the tab button:

```html
<!-- Before & After tab — commented out until patient photos are available
<button @click="tab = 'results'" ...>
    ...
</button>
-->
```

Becomes:

```html
<button @click="tab = 'results'" ...>
    ...
</button>
```

**Step 3 — Uncomment the Before & After section**

Remove the `<template>` wrapper around the section:

```html
<!-- ── BEFORE & AFTER TAB — commented out ... ── -->
<template>
<section x-show="tab === 'results'" ...>
    ...
</section>
</template>
```

Becomes:

```html
<!-- ── BEFORE & AFTER TAB ── -->
<section x-show="tab === 'results'" ...>
    ...
</section>
```

**Step 4 — Uncomment the CSS**

In the `<style>` block near the top of each gallery file, restore the `.ba-slider` rules:

```css
/* Before/after slider — disabled until patient photos are available
.ba-slider img { ... }
.ba-slider { touch-action: none; }
*/
```

Becomes:

```css
/* Before/after slider — disable image drag */
.ba-slider img {
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
}
.ba-slider { touch-action: none; }
```

**Step 5 — Uncomment the JavaScript**

In the `<script>` block, remove the `/* ... */` comment markers around the `beforeAfterCases` array and `baSlider()` function. Then update the array with real image paths:

```js
beforeAfterCases: [
    {
        title: 'Smile Makeover — Veneers',
        description: 'Full porcelain veneer set restoring shape, length, and colour.',
        before: '../images/before-after/case-01-before.jpg',
        after:  '../images/before-after/case-01-after.jpg',
    },
    // add more cases here...
],
```

Do the same in `mk/gallery.html` with the Macedonian titles and descriptions.

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

- **To edit text**: Open the relevant `.html` file in any text editor and change the content. Remember to apply the same change to the counterpart in the other language folder.
- **To update office hours**: Search for `Office Hours` (EN) and `Работно Време` (МКД) in all HTML files. Update the matching rows in the contact page table **and** in the footer table on every page.
- **To add a new service**: Copy an existing service block in `en/services.html` and paste/modify it. Do the same in `mk/services.html`.
- **To add a team member**: Copy a team card block in `en/team.html` and update it. Do the same in `mk/team.html`.
- **To add office gallery photos**: See [Office photos](#office-photos) above.
- **To enable Before & After**: See [Before & After photos](#before--after-photos) above.
- **Re-deploy after edits**: On GitHub Pages, commit the changed file. On Netlify, drag the folder again or use Netlify's Git integration for automatic deploys.

---

## Upgrading Later (if needed)

If the practice grows and you need more features, you can migrate to:

- **WordPress + WP Dental theme** — more features, ~$20/month hosting
- **Squarespace or Wix Dental templates** — visual editor, ~$16–23/month
- **Custom CMS** — full control, requires a developer

For a small practice, this static site approach is the best value.

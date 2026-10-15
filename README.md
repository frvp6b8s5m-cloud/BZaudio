# BZaudio

A responsive, single-page website for BZaudio, focused on professional audio installation, PA system design, and audio equipment. It uses a dark charcoal palette, restrained amber accents, responsive layouts, and reduced-motion support.

## Files

- `index.html` — page content, service sections, equipment information, and inquiry form
- `styles.css` — visual design, responsive layouts, and accessibility states
- `app.js` — mobile/tablet navigation, footer year, and inquiry email-draft behavior
- `admin/index.html` — a shortcut page for editing the site through GitHub
- `.github/workflows/deploy.yml` — automated site checks and GitHub Pages publishing

## Publishing

The site is hosted as a static GitHub Pages project at:

`https://frvp6b8s5m-cloud.github.io/BZaudio/`

The management page is available at:

`https://frvp6b8s5m-cloud.github.io/BZaudio/admin/`

This is a project-site path, so it includes `/BZaudio/` before `admin/`. The management page is not a private dashboard or password gate. It contains links to GitHub's editor; GitHub sign-in and repository write permissions control who can save changes. Commits to `main` trigger the deployment workflow.

## Contact form limitation

The form validates the fields and prepares an email draft in the visitor's email app. It does **not** send or store submissions. No BZaudio recipient email has been configured yet, so the visitor must add the correct recipient in the draft's **To** field before sending. Configure an approved business inbox before advertising this form as a finished lead-capture channel.

## Before launch

1. Replace the temporary typographic mark with the approved BZaudio logo when its image file is available.
2. Configure the correct BZaudio inquiry email and test the full form flow on desktop and mobile.
3. Verify the published site and images in a real browser; automated deployment checks do not replace browser testing.
4. Add a real CMS or backend only if editable products, inventory, or stored inquiry submissions are required. The current GitHub-only site has no checkout, product database, or server-side form handler.

No trading, barter, or marketplace functionality is included.

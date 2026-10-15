# BZaudio

A responsive static website focused on houses of worship and worship sound teams. BZaudio offers PA installation, custom system design, equipment inquiries, system improvements, and practical sound-team training. The brand promise is fast response, helpful guidance, and quality-focused work.

## Website

- Public site: https://frvp6b8s5m-cloud.github.io/BZaudio/
- Site & shop manager: https://frvp6b8s5m-cloud.github.io/BZaudio/admin/
- Product catalog data: `products.json`
- Contact email: `benrz101@gmail.com`

## Main files

- `index.html` — homepage, service descriptions, shop catalog container, training, and contact form
- `styles.css` — visual design and responsive layouts
- `app.js` — navigation, product catalog rendering, and inquiry email-draft behavior
- `products.json` — editable product catalog used by the shop
- `admin/index.html` — links for editing catalog and website content through GitHub
- `.github/workflows/deploy.yml` — GitHub Pages publishing
- `.github/workflows/validate.yml` — automated checks

## Adding products

Edit `products.json` in GitHub. It must remain a valid JSON array. Each product can use these fields:

- `name` — product name
- `category` — category label, such as Speakers or Mixers
- `description` — short, accurate description
- `price` — optional; use only a confirmed price
- `image_url` — optional image URL
- `product_url` — optional product page or checkout link. If omitted, the card links to an email inquiry.

A commit to `main` triggers the deployment workflow. The catalog currently has no products entered, so the public shop displays a clear inquiry message until real product details are added.

## Admin access and static-site limitations

The admin page has no separate BZaudio password. However, GitHub Pages is static hosting and cannot safely accept public edits to the live catalog by itself. To publish catalog changes, the editor must sign in to GitHub with repository write access. Do not put a GitHub access token in public website code. A no-login admin that writes directly to the live shop would require a trusted write service or backend, which this GitHub-only setup does not have.

## Contact form limitation

The contact form validates the required fields and prepares an email draft addressed to `benrz101@gmail.com`. It does **not** send or store submissions. Visitors must review and send the draft in their own email app. Product inquiry cards use the same email-draft approach unless a product URL is supplied.

## Commerce limitations

The product catalog can display items and link to an external product page if one is supplied. There is currently no built-in cart, payment processing, inventory management, order database, or automatic checkout. These require a commerce provider or server-side functionality. No trading or barter functionality is included.

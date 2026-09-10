# Al Batoul Real Estate — البتول للاستثمار العقاري

A bilingual (Arabic / English) marketing site for a Cairo real-estate developer,
built with plain HTML, CSS and vanilla JavaScript. No framework, no build step, no
dependencies — clone it and open `index.html`.

I kept the stack deliberately boring. The whole thing is three JS files and one
stylesheet, so it can be handed to a client, dropped on any static host, and edited
by anyone who knows HTML.

---

## Features

- **Arabic-first and fully RTL.** Arabic is the default; a toggle in the top bar
  switches to English. The choice persists in `localStorage`, and `?lang=en` /
  `?lang=ar` in the URL overrides it for shareable links.
- **Animated hero** — six full-bleed building photographs cross-fading every six
  seconds, each with a slow Ken Burns drift. Clickable progress indicators, pauses
  on hidden tabs, and a single still frame under `prefers-reduced-motion`.
- **Filterable project grid** with status badges, a detail modal, and a footer list
  that deep-links into it.
- **Two contact routes** — WhatsApp (floating button plus a card, both opening a
  pre-written message in the current language) and a callback form where the visitor
  picks the day and time slot they want to be called.
- **Office map** — a Google Maps embed that needs no API key, plus address lines
  that open the pin in the Maps app.
- **Responsive** from 400px phones to desktop, and theme-consistent throughout.

---

## Stack

Plain HTML5, CSS3 and vanilla JavaScript (ES5-compatible, no transpiling needed).
Layout direction is handled entirely with CSS **logical properties**
(`inset-inline-start`, `margin-inline`, `padding-block`…), so a single stylesheet
serves both RTL and LTR — there is no mirrored copy to keep in sync.

Fonts are Cairo (Arabic), Jost and Marcellus (English), from Google Fonts, each with
a system fallback stack.

---

## Running it

Open `index.html` directly, or serve the folder:

```bash
npx serve .          # or: php -S localhost:8000
```

It works fine off the disk (`file://`). The only difference is that the language
preference isn't remembered between visits, because browsers block `localStorage`
on `file://` — the site falls back to Arabic and carries on.

### Deploying

It's a static site, so anything works. For GitHub Pages: **Settings → Pages →
Deploy from a branch → `main` / `(root)`**.

---

## Structure

```
index.html          markup for every section
css/style.css       styling, brand tokens, responsive rules, RTL/LTR handling
js/data.js          project + testimonial content, contact details, office pin
js/i18n.js          Arabic/English string table
js/main.js          hero slider, language switch, filters, modal, form
assets/             logo files
assets/img/         hero, project and interior photography
```

---

## Customising

**Content** lives in `js/data.js` — projects, testimonials, the WhatsApp number and
the office coordinates. Each project carries an `ar` and an `en` block side by side:

```js
{
  id: 'batoul-tower',
  img: 'assets/img/project-3.jpg',
  city: 'nasr',            // drives the location filter
  status: 'ready',         // ready | construction | launching
  ar: { name: '…', location: '…', type: '…', desc: '…', area: '…', units: '…', delivery: '…' },
  en: { … }
}
```

**Copy** lives in `js/i18n.js`, both languages in one table. Elements opt in with
`data-i18n="key"` for text and `data-ph="key"` for placeholders.

**Colours** are CSS custom properties at the top of `css/style.css`, sampled from the
client's logo:

| Token | Value | Use |
|---|---|---|
| `--navy-900 / 800 / 700` | `#07142e` `#0b2149` `#102a5c` | backgrounds, headings |
| `--gold-500 / 400 / 300` | `#c9a227` `#dcb64a` `#eccd7e` | accents, buttons, dividers |
| `--sun-500` | `#f5a623` | the sunburst motif behind the hero and stats |
| `--cream` | `#faf7f1` | page background |

The faint radiating lines behind the hero and the statistics strip are a CSS
`repeating-conic-gradient` echoing the sunburst in the logo mark.

**Hero slides** — swap the files in `assets/img/hero-*.jpg`, or add and remove
`.hero-slide` divs in `index.html`. The progress indicators build themselves from
however many slides are present.

**The office pin** is three values in `js/data.js`:

```js
maps: 'https://maps.app.goo.gl/…',   // shared link, opens the Maps app on phones
lat: 30.1039616,
lng: 31.2901632
```

`lat`/`lng` build the iframe; `maps` is what the address lines and the directions
button point at. Note the embed uses `https://www.google.com/maps/embed?…` rather
than the shorter `maps.google.com/?output=embed` — the latter redirects through a
hop that sends `X-Frame-Options: SAMEORIGIN`, which some browsers refuse to frame.

---

## Notes

- **The callback form is front-end only.** It validates, then shows a confirmation —
  nothing is posted anywhere. The submit handler in `js/main.js` (section 12) is
  where you'd wire up a CRM or an endpoint.
- **Project content is placeholder.** The eight developments, unit sizes, delivery
  dates, the statistics strip and the testimonials are all sample data pending the
  client's real figures.
- **Photography** is from [Unsplash](https://unsplash.com) and stands in for real
  project imagery.
- Social links currently point at `#`.

---

## Browser support

Current Chrome, Edge, Firefox and Safari, phones through desktop. Layout was checked
at 400px, 520px, 760px, 960px and 1440px in both text directions.

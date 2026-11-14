# guardainsan.github.io

Personal portfolio of Sudharsan Durai Sridevi. Static HTML, CSS and JavaScript, no build step, served by GitHub Pages.

## Run it locally

```
python -m http.server 8765
```

Then open http://127.0.0.1:8765. The 404 page uses root-relative links, so it only works when served from the site root.

## Layout

- `index.html` and `404.html`
- `assets/css/tokens.css` holds every colour, type, spacing, radius and motion token; `assets/css/site.css` uses only those
- `assets/js/site.js` places the hero text and photo against the curves, runs the sticky bar, copy-email and video play
- `assets/fonts/` self-hosted WOFF2 files with their OFL licences
- `assets/img/`, `assets/video/` real screenshots, notebook charts and gameplay clips

## Adding a custom domain later

1. Add a file named `CNAME` at the repo root containing just the domain, for example `sudharsan.dev`.
2. At the domain registrar, point the domain at GitHub Pages (an `ALIAS`/`A` record for an apex domain, or a `CNAME` record to `guardainsan.github.io` for a subdomain).
3. In the repo's Settings, Pages, set the custom domain and tick "Enforce HTTPS".

Internal links in `index.html` are relative and the 404 page uses root-relative paths, so nothing else needs to change.

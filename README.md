# CUGA Landing Site

A modern, interactive, fully static landing page for the CUGA project.

## Features

- **Modern Design**: Clean, animated landing page with particle effects
- **Interactive Elements**: Video demos and interactive components
- **Responsive Layout**: Mobile-friendly design
- **Demo Videos**: Integrated video content showcasing CUGA capabilities
- **Fully Static**: No server required - can be deployed to any static hosting service

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Icons**: Lucide React
- **Animations**: Canvas-based particle effects

## Getting Started

### Prerequisites

- Node.js
- pnpm (recommended)

### Installation

```bash
cd cuga-landing-site
pnpm install
```

### Development

```bash
pnpm run dev
```

The landing page will be available at `http://localhost:5173`

### Building for Production

```bash
pnpm run build
```

The static files will be generated in the `dist/` directory.

### Preview Production Build

```bash
pnpm run preview
```

## Deployment

This is a fully static site. After running `pnpm run build`, you can deploy the `dist/` directory to any static hosting service such as:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any other static file hosting

## Project Structure

```
cuga-landing-site/
├── src/
│   ├── index.tsx         # Main landing page component
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/
│   └── videos/          # Demo videos (served statically)
└── dist/                # Built static files (after running build)
```





## Website analytics

GA4 uses the public Measurement ID `G-EM61QTY6TJ`. Google scripts load only on
`cuga.dev` and `www.cuga.dev`, after the visitor allows optional analytics.
Localhost, LAN previews, and staging hosts do not send analytics requests.
Visitors can decline or change their choice using **Analytics settings**.
Declining after acceptance disables collection and expires this site's GA cookies.
Advertising storage, ad personalization, and Google signals are disabled.

Keep Enhanced measurement enabled for the GA4 web stream so page views follow
React Router history changes. The site does not send additional manual page-view
events. Outbound clicks may also appear as GA4's standard `click` event; the named
CTA events below are separate and should not be summed with those events.

| Event | Action |
| --- | --- |
| `try_cuga_apps` | Open the embedded Apps section |
| `get_started` | Open documentation |
| `harness_kit_click` | Open CUGA Harness Kit |
| `github_click` | Open the CUGA agent repository |
| `apps_source_click` | Open the CUGA Apps source |
| `huggingface_click` | Open the Apps Space on Hugging Face |
| `product_tour_open` | Open the product tour |

Named CTA events send only a fixed `placement` value (header, quick_actions,
apps_gallery, footer, or content). They do not send form values, prompt text,
credentials, or destination query strings. The iframe has its own origin and its
internal interactions are outside this property's tracking.

Verify production data under **Reports → Realtime** after allowing analytics.
Analytics blocking and a declined preference will prevent collection.
Run consent, environment, and event-payload tests with:

```bash
node --test scripts/test-analytics.mjs
```

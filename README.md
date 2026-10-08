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





## Publishing the installer

The installation panel and `public/install.sh` target **cuga 0.4.1**. Deploy after the approved wheel and tagged installer are available.

1. Copy `scripts/install.sh` from the approved cuga-agent tag into both `public/install.sh` and `public/install/v0.4.1.sh`.
2. Update `public/install/manifest.json` with the release, source URL, and SHA-256 of the exact script. Keep the setup guide link on the same release.
3. Run `node scripts/check-installer.mjs` and `pnpm run build` locally.
4. Run `node scripts/check-installer.mjs --release` after publication. The deploy workflow uses this check to block the installation command until the PyPI wheel and matching source are available.
5. Deploy through the existing GitHub Pages workflow. Its final check verifies that `https://cuga.dev/install.sh` returns the approved script bytes. To repeat it, run `node scripts/check-installer.mjs --deployed`.

The versioned URL is `https://cuga.dev/install/v0.4.1.sh`. The command uses the stable `install.sh` URL so future upgrades can select a newly approved release.

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





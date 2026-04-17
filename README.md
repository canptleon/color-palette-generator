# Color Palette Generator

A web application for generating beautiful color palettes, built with Next.js, TypeScript, and Tailwind CSS.

## Live Demo

**[https://color-palette-generator-sepia.vercel.app/](https://color-palette-generator-sepia.vercel.app/)**

## Features

- Generate color palettes from a base color
- Browse and explore saved palettes
- Light / Dark theme support
- Responsive design (mobile & desktop layouts)
- Skeleton loading states and toast notifications

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/color-palette-generator.git
cd color-palette-generator

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |

## Project Structure

```
color-palette-generator/
├── components/       # Reusable UI components
├── contexts/         # React context providers (Theme, Toast)
├── data/             # Type definitions
├── layouts/          # Page layouts (Homepage, Palettes, General)
├── pages/            # Next.js pages
└── utils/            # Color utility functions and palette generator
```

## License

MIT

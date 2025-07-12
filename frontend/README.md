# AI Virtual Assistant Frontend

## Setup

```bash
npm install
npm run dev
```

## Environment Variables
- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - App name
- `VITE_THEME` - Default theme

## Docker

```bash
docker build -t ai-virtual-assistant-frontend .
docker run -p 3000:3000 ai-virtual-assistant-frontend
```

## Folder Structure
```
/src
  /components
  /pages
  /api
  /store
  /theme
```

## Features
- React + Vite + TypeScript
- Tailwind CSS + SCSS modules
- Redux Toolkit
- React Router
- Light/Dark theme
- Form validation (react-hook-form/zod)

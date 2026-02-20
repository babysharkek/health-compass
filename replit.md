# Activity Tracker App

## Overview
A fitness/activity tracking application imported from Lovable. It is a frontend-only React + Vite SPA with pages for Activity, Health, Trends, and Profile. Uses shadcn/ui components and Tailwind CSS for styling.

## Recent Changes
- 2026-02-20: Imported from Lovable and configured for Replit environment (port 5000, allowed hosts, workflow setup).
- 2026-02-20: Added GPS-based run tracking, real-time distance/duration updates, and Capacitor Android build configuration.

## Project Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: react-router-dom v6
- **State**: @tanstack/react-query
- **Animations**: framer-motion
- **Icons**: lucide-react, @phosphor-icons/react

## Structure
- `src/pages/` - Page components (Index, Health, Trends, Profile, NotFound)
- `src/components/` - Reusable components (ActivityRing, BottomNav, StatCard, WeeklyChart, etc.)
- `src/components/ui/` - shadcn/ui base components
- `src/hooks/` - Custom hooks (useStepTracker, use-mobile, use-toast)
- `src/lib/` - Utility functions

## Running
- Dev: `npm run dev` (Vite on port 5000)
- Build: `npx vite build` (outputs to `dist/`)
- Deployment: Static site (dist folder)

# Game of Drones — Frontend

A modern React frontend for the Game of Drones experience, built with a cyberpunk-inspired UI and a modular component system.

## Description

This project contains the client-side application for the Game of Drones app. It includes screens for onboarding, authentication, user profile, drone catalog, booking, leaderboard, friends, clans, and settings. The UI is organized with reusable components and custom controls to support a polished game-style interface.

## Key Features

- React + TypeScript frontend
- Modular UI components under `src/app/components/ui`
- Custom app components in `src/app/components`
- Screen-based routing via `src/app/routes.tsx`
- Global settings/context support
- Cyberpunk-oriented visuals and components

## Project Structure

- `src/main.tsx` — application entry point
- `src/app/App.tsx` — root application component
- `src/app/routes.tsx` — route definitions
- `src/app/SettingsContext.tsx` — app settings and theme context
- `src/app/progression.ts` — progression state / logic
- `src/app/components/` — shared UI components
- `src/app/screens/` — page/screen components
- `src/assets/images/` — image assets
- `src/lib/utils.ts` — utility helper functions
- `src/styles/` — global styles and theme files

## Getting Started

```bash
cd c:\Users\User\Desktop\GoD_app
npm install
npm run dev
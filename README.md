# Student Hub

A React + Vite port of the original static Student Hub site (Home, Dashboard,
Notes, Pomodoro), with the same look, text, and behavior as the HTML/CSS/JS
version — just rebuilt as components.

## Structure

- `src/pages` — one component per original page (`Home`, `Dashboard`, `Notes`, `Pomodoro`)
- `src/components` — shared UI: `Navbar`, `Footer`, `ScrollTopButton`, `Card`
- `src/hooks` — stateful logic: `useTheme`, `useScrollTop`, `useTasks`, `usePomodoro`
- `src/styles` — `index.css` (resets/variables/keyframes) and `App.css` (component styles), split from the original `style.css`

Routing is handled with `react-router-dom` (`/`, `/dashboard`, `/notes`, `/pomodoro`) in place of the original separate `.html` files.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build

```bash
npm run build
npm run preview
```

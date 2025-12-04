# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LIVR Playground is an interactive web application for testing and experimenting with LIVR (Language Independent Validation Rules) validators. Users can write validation rules and test data, seeing validation results in real-time. Live demo: http://webbylab.github.io/livr-playground

## Commands

```bash
npm install          # Install dependencies
npm start            # Start dev server at http://localhost:1234
npm run build        # Build production version to dist/ folder
npm run lint         # Run ESLint on src/
npm test             # Runs lint (alias for npm run lint)
```

## Architecture

- **Build tool**: Parcel 2
- **Framework**: React 0.13.x (uses legacy `React.createClass` API)
- **UI**: react-bootstrap 0.24.x
- **Styling**: LESS files co-located with components

### Key Files

- `src/main.js` - Entry point, renders App to DOM
- `src/App.jsx` - Main component with LIVR validation logic, URL state management
- `src/jsonUtils.js` - JSON parsing wrapper using relaxed-json for lenient input parsing
- `src/presets/index.js` - Example validation scenarios (rules + data pairs stored as `.raw` files)

### Core Dependencies

- `livr` - The validation library being demonstrated
- `livr-extra-rules` - Additional LIVR validation rules (registered as defaults in App.jsx)
- `relaxed-json` - Allows users to input non-strict JSON (trailing commas, unquoted keys)

### State Management

App state (rules and data) is persisted in the URL hash as encoded JSON, enabling shareable playground links.

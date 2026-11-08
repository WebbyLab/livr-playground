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
- **Framework**: React 19
- **Editors**: CodeMirror 6 (`src/components/CodeEditor.jsx`), JavaScript mode so relaxed JSON highlights well
- **Styling**: one `src/styles.less`; colors are CSS variables with a dark variant (`prefers-color-scheme`), close to livr-spec.org

### Key Files

- `src/main.js` - Entry point, renders App to DOM
- `src/App.jsx` - Main component: state, URL hash sync, layout
- `src/validate.js` - Registers the extra rules and runs the validator; returns `valid`, `invalid` or `error` (with the source and line)
- `src/components/` - `Header` (examples, copy link), `CodeEditor`, `Result` (the verdict), `Footer`
- `src/jsonUtils.js` - JSON parsing wrapper using relaxed-json for lenient input parsing
- `src/presets/index.js` - Grouped examples (LIVR 2.0, LIVR 2.5, aliases) stored as `.raw` files

### Core Dependencies

- `livr` - The validation library being demonstrated (2.13+, implements LIVR 2.0 and LIVR 2.5)
- `livr-extra-rules` - Additional LIVR validation rules. validate.js registers only the ones LIVR doesn't define, so they don't replace built-in LIVR 2.5 rules with the same name (`uuid`, `iso_date`, ...); `instance_of` and `has_methods` are skipped because JSON input can't contain JavaScript objects
- `relaxed-json` - Allows users to input non-strict JSON (trailing commas, unquoted keys)

### State Management

App state (rules and data) is persisted in the URL hash as encoded JSON, enabling shareable playground links.

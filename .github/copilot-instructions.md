# Copilot Instructions for HR Design System (Handlebars)

## Project Overview
This is a Node.js-based design system using Handlebars, Storybook, and custom asset optimization. It provides reusable UI components, templates, and assets for HR applications. The architecture is modular, with build scripts, asset pipelines, and story-driven documentation.

## Key Directories & Files
- `src/` — Main source code, including `index.js`, assets, and stories
- `build/handlebars/` — Compiled Handlebars templates, helpers, and partials
- `build/gulp/` — Gulp build scripts and cache
- `public/` — Static assets for Storybook and documentation
- `gulpfile.js` — Gulp build configuration
- `package.json` — Scripts, dependencies, and project metadata
- `README.md` — Setup, workflow, and developer guidance

## Developer Workflows
- **Install dependencies:** Use `yarn` (not npm)
- **Start Storybook:** `yarn storybook`
- **Optimize assets:** `yarn optimize-assets` (must run in parallel with Storybook)
- **Recommended:** Use VS Code Macro-Commander extension to start both scripts together (see README for macro setup)
- **Node version:** Use Node.js 20.11.1 (see `.nvmrc` and README for NVM setup)

## Build & Asset Pipeline
- Asset optimization (SVGs, JSON test data, Modernizr.js, Handlebars templates) is handled by `yarn optimize-assets`.
- Optimized/cached assets are stored in `build/gulp/cache`.
- The pipeline runs in watch mode and only re-processes changed files for faster builds.

## Project-Specific Conventions
- **Yarn is required** for dependency management due to Storybook compatibility.
- **Storybook stories** and documentation are in `src/stories/` and `public/storybook-static/`.
- **Handlebars templates** are compiled and exported as JS modules for integration.
- **Custom Modernizr build** is generated and used for feature detection.
- **Macros for VS Code**: Macro-Commander is recommended for running both main scripts together.

## Integration Points
- **External dependencies:** Storybook, Handlebars, Modernizr, Gulp, TailwindCSS, PostCSS
- **Custom helpers/partials:** Located in `build/handlebars/helpers/` and `build/handlebars/partials/`
- **Webpack config:** For bundling assets and scripts

## Examples & Patterns
- To add a new UI component, create a Handlebars template in `build/handlebars/partials/` and a story in `src/stories/`.
- For asset changes, update source files and run `yarn optimize-assets` to regenerate optimized outputs.
- For new helpers, add to `build/handlebars/helpers/` and ensure they are registered in the build pipeline.

## Troubleshooting
- If Storybook does not reflect changes, ensure both `yarn storybook` and `yarn optimize-assets` are running.
- For Node version issues, use NVM and check `.nvmrc`.
- For dependency issues, always use `yarn`.

---
For more details, see the [README.md](../../README.md).

# scully-plugin-ghost

> **scully-plugin-ghost** is a small small router plugin for [scully](https://scully.io/) to retrieve **posts** content from your [Ghost](https://github.com/TryGhost/Ghost) headless CMS.

## Requirements

- Angular 9+
- [Scully](https://scully.io/)
- Ghost content API

## Usage

1. Install plugin as dev dependency

```bash
npm i -D scully-plugin-ghost # or yarn add -D scully-plugin-ghost
```

2. Setup Scully config file named scully< projectName>.config.ts

```ts
// ./scully<projectName>.config.ts
import { ScullyConfig } from '@scullyio/scully';
import 'dotenv/config';
import 'scully-plugin-ghost';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: '<projectName>',
  outDir: './dist/static',
  routes: {
    '/blog/:postId': {
      type: 'ghostRouter',
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
    },
  },
};
```

## Powered by [TSDX](https://tsdx.io/)

### Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).

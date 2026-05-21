# VitePress

> Vue-based, fast, minimal UI. Good for Vue/Vite ecosystem projects.

## Setup

```bash
npm create vitepress@latest my-docs -- --template default
cd my-docs
npm install
npm run dev
```

## File tree

```
.
├── docs/
│   ├── index.md
│   ├── mysql/
│   └── .vitepress/
│       ├── config.ts
│       └── theme/
│           ├── index.ts
│           └── custom.css
├── package.json
└── .github/workflows/docs.yml
```

## package.json

```json
{
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "latest"
  }
}
```

## docs/.vitepress/config.ts

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DevDocs',
  description: 'Personal developer reference',
  appearance: 'dark',
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'MySQL', link: '/mysql/' }
    ],
    sidebar: [
      {
        text: 'MySQL',
        items: [
          { text: 'Overview', link: '/mysql/' },
          { text: 'Backup', items: [
            { text: 'mysqldump', link: '/mysql/backup/mysqldump' }
          ]},
          { text: 'Admin', items: [
            { text: 'Slow Queries & Processes', link: '/mysql/admin/performance' },
            { text: 'Drop All Tables', link: '/mysql/admin/drop-tables' }
          ]},
          { text: 'Magento', link: '/mysql/magento' },
          { text: 'Reference', items: [
            { text: 'Cheatsheet', link: '/mysql/reference/cheatsheet' }
          ]}
        ]
      }
    ]
  }
})
```

## docs/.vitepress/theme/index.ts

```ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'
export default DefaultTheme
```

## docs/.vitepress/theme/custom.css

```css
/* Fix dark mode text contrast */
.dark {
  --vp-c-text-1: rgba(255, 255, 255, 0.92);
  --vp-c-text-2: rgba(255, 255, 255, 0.78);
  --vp-c-text-3: rgba(255, 255, 255, 0.64);
}
```

## docs/index.md

```md
---
layout: home

hero:
  name: DevDocs
  tagline: Personal developer reference
  actions:
    - theme: brand
      text: MySQL
      link: /mysql/
---
```

## .github/workflows/docs.yml

```yaml
name: Deploy Docs
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist
      - uses: actions/deploy-pages@v4
```

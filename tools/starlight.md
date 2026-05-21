# Starlight

> Astro-based, fast static builds, built-in accessibility and i18n support.

## Setup

```bash
npm create astro@latest my-docs -- --template starlight
cd my-docs
npm install
npm run dev
```

## File tree

```
.
├── src/
│   └── content/
│       └── docs/
│           ├── index.mdx
│           └── mysql/
├── astro.config.mjs
├── package.json
└── .github/workflows/docs.yml
```

## astro.config.mjs

```js
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  integrations: [
    starlight({
      title: 'DevDocs',
      sidebar: [
        {
          label: 'MySQL',
          items: [
            { label: 'Overview', link: '/mysql/' },
            {
              label: 'Backup',
              items: [
                { label: 'mysqldump', link: '/mysql/backup/mysqldump' }
              ]
            },
            {
              label: 'Admin',
              items: [
                { label: 'Slow Queries & Processes', link: '/mysql/admin/performance' },
                { label: 'Drop All Tables', link: '/mysql/admin/drop-tables' }
              ]
            },
            { label: 'Magento', link: '/mysql/magento' },
            {
              label: 'Reference',
              items: [
                { label: 'Cheatsheet', link: '/mysql/reference/cheatsheet' }
              ]
            }
          ]
        }
      ]
    })
  ]
})
```

## src/content/docs/index.mdx

```mdx
---
title: DevDocs
description: Personal developer reference
template: splash
hero:
  tagline: Personal developer reference
  actions:
    - text: MySQL
      link: /mysql/
      icon: right-arrow
---
```

## Note: title frontmatter required

Every `.md` file must have `title` in frontmatter or Starlight throws `InvalidContentEntryDataError`:

```md
---
title: Overview
---
```

Add to all files at once:

```bash
for f in src/content/docs/**/*.md; do
  if ! grep -q "^title:" "$f"; then
    title=$(basename "$f" .md | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2); print}')
    printf -- "---\ntitle: %s\n---\n\n%s" "$title" "$(cat $f)" > "$f"
  fi
done
```

## Note: index.md slug

Links for `index.md` files must use the directory path, not `index`:

```js
{ label: 'Overview', link: '/mysql/' }     // correct
{ label: 'Overview', link: '/mysql/index' } // 404
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
          path: dist
      - uses: actions/deploy-pages@v4
```

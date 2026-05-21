# MkDocs Material

> Current setup. Python-based, fastest build, simplest config.

## Setup

```bash
pip install mkdocs-material
mkdocs new .
mkdocs serve
```

## File tree

```
.
├── docs/
│   ├── index.md
│   └── mysql/
├── mkdocs.yml
└── .github/workflows/docs.yml
```

## mkdocs.yml

```yaml
site_name: DevDocs
docs_dir: docs

theme:
  name: material
  palette:
    - scheme: default
      primary: blue
      accent: cyan
      toggle:
        icon: material/weather-night
        name: Switch to dark mode
    - scheme: slate
      primary: blue
      accent: cyan
      toggle:
        icon: material/weather-sunny
        name: Switch to light mode
  features:
    - content.code.copy
    - navigation.expand

markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
      guess_lang: true
  - pymdownx.superfences
  - pymdownx.inlinehilite

nav:
  - Home: index.md
  - MySQL:
      - Overview: mysql/index.md
```

## docs/index.md

```md
# DevDocs

Personal developer reference.

## Topics

- [MySQL](mysql/index.md)
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
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install mkdocs-material
      - run: mkdocs build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site
      - uses: actions/deploy-pages@v4
        id: deployment
```

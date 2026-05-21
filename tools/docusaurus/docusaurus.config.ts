import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'DevDocs',
  tagline: 'Personal developer reference',
  url: 'https://your-org.github.io',
  baseUrl: '/',
  organizationName: 'your-org',
  projectName: 'devdocs',
  themeConfig: {
    navbar: {
      title: 'DevDocs',
      items: [
        { type: 'docSidebar', sidebarId: 'mysqlSidebar', label: 'MySQL' }
      ]
    },
    prism: {
      additionalLanguages: ['bash', 'sql', 'php', 'yaml']
    }
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts'
        },
        blog: false
      } satisfies Preset.Options
    ]
  ]
}

export default config

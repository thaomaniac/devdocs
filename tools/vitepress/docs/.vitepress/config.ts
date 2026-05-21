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

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

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://orcas-portfolio.vercel.app',
  integrations: [sitemap()],
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const priorityFor = (url) => {
  const path = new URL(url).pathname;
  if (path === '/') return 1.0;
  if (path === '/insights/') return 0.8;
  if (path.startsWith('/insights/')) return 0.7;
  return 0.9;
};

const changefreqFor = (url) => {
  const path = new URL(url).pathname;
  if (path.startsWith('/insights/')) return 'monthly';
  return 'weekly';
};

export default defineConfig({
  site: 'https://abqwax.ing',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        return {
          url: item.url,
          lastmod: item.lastmod,
          changefreq: changefreqFor(item.url),
          priority: priorityFor(item.url),
        };
      },
    }),
  ],
});

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const insights = (await getCollection('insights'))
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
    );

  return rss({
    title: 'ABQWax.ing Insights',
    description:
      'Practical guides on Albuquerque waxing, hard wax, Brazilian prep, and aftercare — plus the ABQWax.ing domain offering.',
    site: context.site ?? 'https://abqwax.ing',
    items: insights.map((post: (typeof insights)[number]) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/insights/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}

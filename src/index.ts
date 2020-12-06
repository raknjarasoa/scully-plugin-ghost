import { HandledRoute, registerPlugin, routeSplit } from '@scullyio/scully';
import GhostContentAPI, { GhostContentAPIOptions } from '@tryghost/content-api';

export const fetchGhostPosts = (configOptions: GhostContentAPIOptions) => {
  // console.log('\n⠏ Fetch ghost contents 🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕');
  const api = new GhostContentAPI({
    url: configOptions.url,
    key: configOptions.key,
    version: configOptions.version || 'v3',
  });

  return api.posts.browse({
    limit: 'all',
    include: ['tags', 'authors', 'count.posts'],
    formats: ['html'],
  });
};

const contentRendererPlugin = (
  html?: string,
  route?: HandledRoute
): Promise<string> => {
  // console.log(`\n⠏ Ghost Renderer plugin 🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺`);
  return new Promise((resolve, reject) => {
    try {
      const splitter = `<h2 id="___scully-parsing-error___">Sorry, could not load static page content</h2>`;
      const [begin, end] = html?.split(splitter)!;
      const ghostContentHtml = `${route?.data?.ghostContent.html}`;

      resolve(`${begin}${ghostContentHtml}${end}`);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
export const contentRenderer = Symbol('contentRenderer');
registerPlugin('render', contentRenderer, contentRendererPlugin, () => []);

const ghostRouterPlugin = async (
  route?: string,
  config?: any
): Promise<HandledRoute[]> => {
  // console.log(`\n⠏ Ghost Router plugin 🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷`);
  const { createPath } = routeSplit(route!);

  try {
    const posts = await fetchGhostPosts({
      url: config.apiUrl,
      key: config.contentApiKey,
      version: 'v3',
    });

    return posts.map(post => ({
      route: createPath(post.slug),
      data: {
        slug: post.slug,
        title: post.title,
        authors: post.authors,
        ghostContent: post,
      },
      postRenderers: [contentRenderer],
    }));
  } catch (error) {
    console.error(error);
  }

  return [];
};

const validator = async (config: { apiUrl: string; contentApiKey: string }) => {
  const errors = [];

  if (!config.apiUrl) {
    errors.push('A ghost apiUrl is reequired');
  }

  if (!config.contentApiKey) {
    errors.push('A ghost contentApiKey is reequired');
  }

  return errors;
};
export const ghostRouter = 'ghostRouter';
registerPlugin('router', ghostRouter, ghostRouterPlugin, validator);

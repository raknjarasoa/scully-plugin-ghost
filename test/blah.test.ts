import { fetchGhostPosts } from '../src';

describe('fetchGhostPosts', () => {
  it('fetch ghost public content should work', async () => {
    const posts = await fetchGhostPosts({
      url: 'https://demo.ghost.io',
      key: '22444f78447824223cefc48062',
      version: 'v3',
    });
    expect(posts.length > 0).toBe(true);
  });
});

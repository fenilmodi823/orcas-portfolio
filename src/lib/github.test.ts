import { describe, it, expect, vi } from 'vitest';
import { fetchPinnedRepos, OFFLINE_SNAPSHOT } from './github';

const okRepo = (name: string) => ({
  name, description: 'd', language: 'TypeScript', fork: false,
  stargazers_count: 1, forks_count: 0, pushed_at: '2026-08-01T00:00:00Z',
  html_url: `https://github.com/fenilmodi823/${name}`,
});

describe('fetchPinnedRepos', () => {
  it('returns live data and pinned order when the API succeeds', async () => {
    const fakeFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [okRepo('b'), okRepo('orcas'), okRepo('a')],
    });
    const result = await fetchPinnedRepos('fenilmodi823', ['orcas'], fakeFetch as unknown as typeof fetch);
    expect(result.source).toBe('live');
    expect(result.repos[0].name).toBe('orcas');
  });

  it('excludes forks', async () => {
    const fakeFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ ...okRepo('forked'), fork: true }, okRepo('own')],
    });
    const result = await fetchPinnedRepos('fenilmodi823', [], fakeFetch as unknown as typeof fetch);
    expect(result.repos.map((r) => r.name)).not.toContain('forked');
  });

  it('falls back to the offline snapshot when the API is unreachable', async () => {
    const fakeFetch = vi.fn().mockRejectedValue(new Error('network down'));
    const result = await fetchPinnedRepos('fenilmodi823', [], fakeFetch as unknown as typeof fetch);
    expect(result.source).toBe('offline-snapshot');
    expect(result.repos).toEqual(OFFLINE_SNAPSHOT);
  });

  it('falls back to the offline snapshot on a non-OK response (rate limit)', async () => {
    const fakeFetch = vi.fn().mockResolvedValue({ ok: false, status: 403, json: async () => ({}) });
    const result = await fetchPinnedRepos('fenilmodi823', [], fakeFetch as unknown as typeof fetch);
    expect(result.source).toBe('offline-snapshot');
  });

  it('caps the result at six repos', async () => {
    const many = Array.from({ length: 20 }, (_, i) => okRepo(`repo${i}`));
    const fakeFetch = vi.fn().mockResolvedValue({ ok: true, json: async () => many });
    const result = await fetchPinnedRepos('fenilmodi823', [], fakeFetch as unknown as typeof fetch);
    expect(result.repos.length).toBeLessThanOrEqual(6);
  });
});

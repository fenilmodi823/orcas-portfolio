export interface RepoSummary {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  url: string;
}

export interface GithubFetchResult {
  repos: RepoSummary[];
  source: 'live' | 'offline-snapshot';
}

// Snapshot taken 2026-08-19 from https://api.github.com/users/fenilmodi823/repos
export const OFFLINE_SNAPSHOT: RepoSummary[] = [
  { name: 'orcas', description: 'Probabilistic conjunction assessment for orbital debris.', language: 'Python', stars: 0, forks: 1, pushedAt: '2026-08-15T08:16:20Z', url: 'https://github.com/fenilmodi823/orcas' },
  { name: 'diablex-core', description: null, language: 'JavaScript', stars: 0, forks: 0, pushedAt: '2026-02-17T16:39:16Z', url: 'https://github.com/fenilmodi823/diablex-core' },
  { name: 'Quantum-Enhanced-AES-Encryption', description: null, language: 'Python', stars: 0, forks: 0, pushedAt: '2025-12-06T16:19:43Z', url: 'https://github.com/fenilmodi823/Quantum-Enhanced-AES-Encryption' },
  { name: 'Space-Science', description: 'Learning Space Science with Python', language: 'Jupyter Notebook', stars: 0, forks: 0, pushedAt: '2025-09-05T17:29:06Z', url: 'https://github.com/fenilmodi823/Space-Science' },
  { name: 'Projects', description: 'Freelance Projects in my free time', language: 'Jupyter Notebook', stars: 0, forks: 0, pushedAt: '2025-05-11T10:29:01Z', url: 'https://github.com/fenilmodi823/Projects' },
];

interface GithubApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  html_url: string;
}

export async function fetchPinnedRepos(
  user: string,
  pinnedOrder: string[],
  fetchImpl: typeof fetch = fetch,
): Promise<GithubFetchResult> {
  try {
    const res = await fetchImpl(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`,
    );
    if (!res.ok) return { repos: OFFLINE_SNAPSHOT, source: 'offline-snapshot' };
    const data = (await res.json()) as GithubApiRepo[];
    const owned = data.filter((r) => !r.fork);
    const toSummary = (r: GithubApiRepo): RepoSummary => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushedAt: r.pushed_at,
      url: r.html_url,
    });
    const pinned = pinnedOrder
      .map((name) => owned.find((r) => r.name === name))
      .filter((r): r is GithubApiRepo => r !== undefined);
    const rest = owned.filter((r) => !pinnedOrder.includes(r.name));
    const ordered = [...pinned, ...rest].slice(0, 6).map(toSummary);
    return { repos: ordered, source: 'live' };
  } catch {
    return { repos: OFFLINE_SNAPSHOT, source: 'offline-snapshot' };
  }
}

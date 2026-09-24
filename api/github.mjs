// GET /api/github — profile + repos for the open-source section, fetched once and cached by the CDN.
// Browsers calling api.github.com directly share GitHub's 60-requests/hour-per-IP anonymous limit, so a few
// reloads (or a busy office/college network) blank the section. Here every visitor reads the same cached JSON;
// GitHub sees a handful of requests an hour. Optional GITHUB_TOKEN (a fine-grained token with no extra access)
// raises the upstream limit to 5,000/hour.

const USER = 'latharrr';

const json = (status, obj, cache) => new Response(JSON.stringify(obj), {
  status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': cache || 'no-store' },
});

const gh = async (path) => {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'deepanshulathar.com portfolio', 'X-GitHub-Api-Version': '2022-11-28' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const r = await fetch('https://api.github.com' + path, { headers, signal: AbortSignal.timeout(8000) });
  if (!r.ok) {
    const e = new Error('github-' + r.status);
    e.status = r.status;
    e.rateLimited = (r.status === 403 || r.status === 429) && r.headers.get('x-ratelimit-remaining') === '0';
    throw e;
  }
  return r.json();
};

export async function GET() {
  try {
    const [u, repos] = await Promise.all([gh(`/users/${USER}`), gh(`/users/${USER}/repos?per_page=100&sort=pushed`)]);
    return json(200, {
      user: { public_repos: u.public_repos, followers: u.followers, created_at: u.created_at },
      repos: repos.map((r) => ({
        name: r.name, html_url: r.html_url, description: r.description, language: r.language,
        stargazers_count: r.stargazers_count, pushed_at: r.pushed_at, fork: r.fork,
      })),
    }, 'public, max-age=300, s-maxage=900, stale-while-revalidate=86400');
  } catch (e) {
    return json(e.rateLimited ? 429 : 502, { error: e.rateLimited ? 'rate-limited' : 'github-unreachable' });
  }
}

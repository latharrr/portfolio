// GET /api/contributions — the real GitHub contribution calendar for latharrr (the one on the profile page).
// The public events API misses private-repo work and only reaches back ~90 days, so the portfolio reads this instead.
// GitHub serves the calendar as HTML without CORS; this parses it server-side and the CDN caches the JSON for an hour.

const USER = 'latharrr';

const json = (status, obj, cache) => new Response(JSON.stringify(obj), {
  status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': cache || 'no-store' },
});

export async function GET() {
  let html;
  try {
    const r = await fetch(`https://github.com/users/${USER}/contributions`, {
      headers: { 'User-Agent': 'deepanshulathar.com portfolio', Accept: 'text/html' },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return json(502, { error: 'github-' + r.status });
    html = await r.text();
  } catch {
    return json(504, { error: 'github-unreachable' });
  }

  // each day cell: <td data-date="2026-09-24" id="contribution-day-component-3-51" data-level="1">
  // its count lives in a matching <tool-tip for="contribution-day-component-3-51">4 contributions on …</tool-tip>
  const cells = new Map();
  for (const m of html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"\s+id="([\w-]+)"\s+data-level="(\d)"/g)) cells.set(m[2], { date: m[1], level: Number(m[3]), count: 0 });
  for (const m of html.matchAll(/for="([\w-]+)"[^>]*>\s*(No|\d[\d,]*) contributions?/g)) {
    const c = cells.get(m[1]);
    if (c) c.count = m[2] === 'No' ? 0 : Number(m[2].replace(/,/g, ''));
  }
  if (!cells.size) return json(502, { error: 'unparseable' });

  const days = [...cells.values()].sort((a, b) => (a.date < b.date ? -1 : 1)).map((d) => [d.date, d.count, d.level]);
  const head = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
  const total = head ? Number(head[1].replace(/,/g, '')) : days.reduce((a, d) => a + d[1], 0);

  return json(200, { user: USER, total, days }, 'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400');
}

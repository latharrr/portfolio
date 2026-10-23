/* Open-source section — live GitHub data, never hard-coded.
   Cells render "—" until the APIs respond; on failure they stay blank with a note.
   Lazy: starts when the section nears the viewport. */
(function () {
  "use strict";
  var started = false;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function set(key, html) {
    var el = document.querySelector('[data-oss="' + key + '"]');
    if (el) el.innerHTML = html;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function relTime(iso) {
    var d = new Date(iso), now = new Date();
    var days = Math.floor((now - d) / 86400000);
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    return days + " days ago";
  }

  async function getJSON(url, opts) {
    var r = await fetch(url, opts);
    if (!r.ok) throw new Error("http " + r.status);
    return r.json();
  }

  async function loadContrib(fresh) {
    var data = await getJSON("/api/contributions" + (fresh ? "?t=" + Date.now() : ""));
    var days = data.days || [];
    set("contrib", esc(Number(data.total || 0).toLocaleString("en-IN")));

    /* longest streak + last active day */
    var streak = 0, best = 0, lastActive = null;
    days.forEach(function (d) {
      if (d[1] > 0) { streak += 1; best = Math.max(best, streak); lastActive = d[0]; }
      else streak = 0;
    });
    set("streak", best > 0 ? esc(String(best)) : "—");

    /* Monday-first full-year calendar */
    var cal = $('[data-oss="cal"]');
    if (cal) {
      cal.innerHTML = "";
      cal.setAttribute("aria-label", "Contribution calendar: " + (data.total || 0) + " contributions in the last year");
      var first = days.length ? new Date(days[0][0]) : new Date();
      var lead = (first.getDay() + 6) % 7; /* Monday-first offset */
      for (var i = 0; i < lead; i++) { var p = document.createElement("i"); cal.appendChild(p); }
      days.forEach(function (d) {
        var cell = document.createElement("i");
        if (d[2] > 0) cell.className = "l" + Math.min(4, d[2]);
        cell.title = d[0] + ": " + d[1] + " contributions";
        cal.appendChild(cell);
      });
    }
    return { lastActive: lastActive };
  }

  async function loadGithub(fresh) {
    var data;
    try {
      data = await getJSON("/api/github", fresh ? { cache: "reload" } : undefined);
    } catch (e) {
      /* last-resort direct fallback, per-visitor rate limit */
      var u = await getJSON("https://api.github.com/users/latharrr");
      var r = await getJSON("https://api.github.com/users/latharrr/repos?per_page=100&sort=pushed");
      data = { user: u, repos: r };
    }
    var repos = Array.isArray(data.repos) ? data.repos : [];
    var user = data.user || {};

    var count = user.public_repos != null ? user.public_repos : repos.length;
    set("repos", esc(String(count)));
    document.querySelectorAll("[data-oss-repos]").forEach(function (el) { el.textContent = count; });

    var stars = repos.reduce(function (s, r) { return s + (r.stargazers_count || 0); }, 0);
    set("stars", esc(String(stars)));

    /* language mix: % of repos, top 5 */
    var langs = {};
    repos.forEach(function (r) { if (r.language && !r.fork) langs[r.language] = (langs[r.language] || 0) + 1; });
    var top = Object.keys(langs).sort(function (a, b) { return langs[b] - langs[a]; }).slice(0, 5);
    var total = top.reduce(function (s, k) { return s + langs[k]; }, 0) || 1;
    set("langs", top.length
      ? top.map(function (k) { return esc(k) + " " + Math.round(langs[k] / total * 100) + "%"; }).join(" · ")
      : "—");

    /* recent pushes: 5 most recent */
    var pushes = repos
      .filter(function (r) { return !r.fork; })
      .sort(function (a, b) { return new Date(b.pushed_at) - new Date(a.pushed_at); })
      .slice(0, 5);
    set("pushes", pushes.length
      ? pushes.map(function (r) {
          return '<div style="margin-bottom:8px"><a href="' + esc(r.html_url) + '" style="color:var(--link)">' + esc(r.name) + "</a>" +
            ' <span style="color:var(--ink-3)">· ' + esc(r.language || "—") + " · pushed " + esc(relTime(r.pushed_at)) + "</span></div>";
        }).join("")
      : "—");
  }

  async function sync(fresh) {
    var status = document.querySelector("[data-oss-status]");
    if (status) status.textContent = "syncing…";
    var errors = [];
    try { await loadContrib(fresh); }
    catch (e) { errors.push("contributions"); }
    try { await loadGithub(fresh); }
    catch (e) { errors.push("repos"); }
    if (status) {
      status.textContent = errors.length
        ? "GitHub API unreachable (" + errors.join(", ") + ") — showing blanks, not stale numbers."
        : "synced just now";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.getElementById("oss-grid");
    if (!grid) return;
    var retry = document.getElementById("oss-retry");
    if (retry) retry.addEventListener("click", function () { sync(true); });
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !started) { started = true; sync(false); io.disconnect(); }
    }, { rootMargin: "600px" });
    io.observe(grid);
  });
})();

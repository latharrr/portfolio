/* "Ask about me" terminal — restyled for the Sketchbook Desk.
   Shell-like commands answered client-side; questions stream from /api/ask.
   Monospace lives only in here. */
(function () {
  "use strict";
  var log, form, input;
  var busy = false;          // one answer at a time
  var lastAskAt = 0;
  var aiHistory = [];        // [{q,a}] capped at 3
  var demoTimers = [];
  var demoAlive = true;

  var SAVED = {
    "what is he building right now?": "at picapool\u2019s founder\u2019s office he builds ai and attribution tooling: a read-only ai data analyst over the analytics database, internal tools and n8n automations. on the side: proofmart (a live document-forensics api) and gapl (a live resume-readiness engine).",
    "is he available for internships, and when?": "yes \u2014 summer 2027 internships. he\u2019s based in delhi ncr (IST). fastest route: email deepanshulathar@gmail.com or type \"resume\".",
    "which project should i look at first, and why?": "start with proofmart: it is live at proofmart.shop, and every finding it reports is pinned to the page with the arithmetic that proves it. then gapl, live at gapl.vercel.app.",
    "what has he done at startups?": "at picapool (founder\u2019s office, jul 2025 \u2013 now) he shipped 15+ internal tools in 8 weeks and built the attribution behind a campus push that reached 3,000+ students. at unilyf (jan \u2013 may 2026) he led a team of 6 and validated demand with 200+ beta users."
  };

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  function line(html, cls) {
    var div = document.createElement("div");
    if (cls) div.className = cls;
    div.innerHTML = html;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }
  function echo(cmd) { line('<span class="q">$ ' + esc(cmd) + "</span>"); }
  function sys(t) { line('<span class="sys">' + esc(t) + "</span>"); }
  function err(t) { line('<span class="err">' + esc(t) + "</span>"); }

  function aiLine() {
    var div = document.createElement("div");
    div.innerHTML = '<span class="ai-tag" style="color:#02768B">AI</span> <span class="ai-txt"></span>';
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div.querySelector(".ai-txt");
  }

  var COMMANDS = {
    whoami: function () { sys("deepanshu-lathar \u2014 full-stack & AI engineer"); },
    projects: function () {
      sys("proofmart \u2014 document-forensics API \u00b7 live, beta \u00b7 proofmart.shop");
      sys("gapl \u2014 recruiter-screen simulator \u00b7 live \u00b7 gapl.vercel.app");
      sys("lputv \u2014 ten-minute campus video chats \u00b7 live \u00b7 lputv.vercel.app");
      sys("labs \u2014 whatsapp ai receptionist \u00b7 live 24/7 \u00b7 deepanshulathar.com/labs");
    },
    skills: function () { sys("typescript · python · sql · react · next.js · postgres · langgraph · n8n \u2014 full list in #skills"); },
    contact: function () {
      sys("email deepanshulathar@gmail.com");
      sys("linkedin /in/deepanshulathar · github @latharrr · whatsapp wa.me/918221016809");
    },
    date: function () {
      try {
        sys(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST");
      } catch (e) { sys(new Date().toString()); }
    },
    resume: function () {
      sys("downloading r\u00e9sum\u00e9…");
      var a = document.createElement("a");
      a.href = "/Deepanshu-Lathar-Resume.pdf"; a.download = "Deepanshu-Lathar-Resume.pdf";
      document.body.appendChild(a); a.click(); a.remove();
    },
    ls: function () { sys("work  experience  ask  receipts  skills  open-source  writing  about  contact"); },
    pwd: function () { sys("/home/deepanshu/portfolio"); },
    sudo: function () { sys("nice try. hiring managers only."); },
    vim: function () { sys("no. we do not negotiate with vim here."); },
    theme: function () { sys("themes retired \u2014 it\u2019s paper now."); },
    clear: function () { log.innerHTML = ""; },
    help: function () {
      sys("commands: whoami · projects · skills · contact · resume · date · ls · pwd · clear · help");
      sys("or just ask a question \u2014 e.g. \u201cwhat is he building right now?\u201d");
    }
  };

  function savedFor(q) {
    var key = q.trim().toLowerCase();
    if (SAVED[key]) return SAVED[key];
    for (var k in SAVED) {
      if (key.indexOf(k.replace(/[?.]/g, "")) !== -1 || k.indexOf(key.replace(/[?.]/g, "")) !== -1) return SAVED[k];
    }
    return null;
  }

  async function askAI(q) {
    var now = Date.now();
    if (now - lastAskAt < 1500) { sys("easy \u2014 give it a second"); return; }
    lastAskAt = now;
    if (busy) { sys("one at a time \u2014 the current answer is still streaming"); return; }
    busy = true;
    var txt = aiLine();
    var answer = "";
    try {
      var res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: q, history: aiHistory.slice(-3) })
      });
      var left = res.headers.get("X-Questions-Left");
      if (res.ok && res.body && res.body.getReader) {
        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        for (;;) {
          var r = await reader.read();
          if (r.done) break;
          var chunk = decoder.decode(r.value, { stream: true });
          answer += chunk;
          txt.textContent = answer;
          log.scrollTop = log.scrollHeight;
        }
        aiHistory.push({ q: q, a: answer.slice(0, 600) });
        if (aiHistory.length > 3) aiHistory = aiHistory.slice(-3);
      } else {
        var j = null;
        try { j = await res.json(); } catch (e) {}
        throw new Error((j && j.error) || "offline");
      }
      if (left !== null) {
        var n = parseInt(left, 10);
        if (!isNaN(n)) {
          if (n === 0) sys("# that was your last question for today");
          else if (n <= 3) sys("# " + n + " question(s) left today");
        }
      }
    } catch (e) {
      txt.closest("div").remove();
      var saved = savedFor(q);
      if (saved) {
        var d = aiLine();
        d.textContent = saved;
        line('<span class="sys"># the live assistant is unavailable, so this is a saved answer</span>');
      } else {
        err("the assistant is offline right now \u2014 try \"help\"");
      }
    }
    busy = false;
  }

  function looksLikeQuestion(s) {
    var t = s.trim();
    return t.length > 1 && (t.indexOf(" ") !== -1 || /\?$/.test(t));
  }

  function run(raw) {
    var cmd = raw.trim();
    if (!cmd) return;
    stopDemo();
    echo(cmd);
    var low = cmd.toLowerCase();
    if (low.indexOf("ask ") === 0) { askAI(cmd.slice(4).trim()); return; }
    if (COMMANDS[low]) { COMMANDS[low](); return; }
    if (looksLikeQuestion(cmd)) { askAI(cmd); return; }
    err('command not found: ' + cmd.split(" ")[0] + ' \u2014 try "help", or just ask a question');
  }

  /* ---- attract mode: scripted demo plays once until the visitor takes over ---- */
  var DEMO = [
    ["whoami", 900],
    ["ask what is he building right now?", 2600],
    ["projects", 5200],
    ["ask is he open to internships?", 4200],
    ["skills", 5200],
    ["contact", 2600]
  ];
  function stopDemo() {
    if (!demoAlive) return;
    demoAlive = false;
    demoTimers.forEach(clearTimeout);
    demoTimers = [];
  }
  function playDemo() {
    sys("# scripted demo, plays once \u2014 click here and type to take over");
    var t = 1200;
    DEMO.forEach(function (step) {
      t += step[1];
      demoTimers.push(setTimeout(function () {
        if (!demoAlive || busy) return;
        run(step[0]);
      }, t));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    log = document.getElementById("term-log");
    form = document.getElementById("term-form");
    input = document.getElementById("term-input");
    if (!log || !form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value;
      input.value = "";
      run(v);
      input.focus();
    });
    log.addEventListener("click", stopDemo);
    input.addEventListener("focus", stopDemo);
    document.querySelectorAll(".suggest").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.dataset.cmd) run(b.dataset.cmd);
        else if (b.dataset.q) { stopDemo(); echo(b.dataset.q); askAI(b.dataset.q); }
        input.focus();
      });
    });
    /* attract mode only when the terminal is near the viewport and untouched */
    var started = false;
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !started) { started = true; playDemo(); io.disconnect(); }
    }, { rootMargin: "200px" });
    io.observe(log);
  });
})();

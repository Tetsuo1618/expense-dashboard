<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JS Forge — Learn JavaScript</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  /* ── DESIGN SYSTEM ──────────────────────────────────── */
  :root {
    --bg:        #0d0f14;
    --surface:   #161a24;
    --panel:     #1e2433;
    --border:    #2c3347;
    --accent:    #f0c040;   /* molten gold — "forge" motif */
    --accent2:   #e05a3a;   /* ember orange */
    --green:     #4ecb8d;
    --red:       #e05a5a;
    --text:      #d8dde8;
    --muted:     #6b7690;
    --font-head: 'Syne', sans-serif;
    --font-code: 'Space Mono', monospace;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-head);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── NOISE TEXTURE OVERLAY ──────────────────────────── */
  body::before {
    content:'';
    position:fixed; inset:0; pointer-events:none; z-index:0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.35;
  }

  /* ── HEADER ─────────────────────────────────────────── */
  header {
    position: relative; z-index:10;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 32px;
    border-bottom: 1px solid var(--border);
    background: rgba(13,15,20,0.92);
    backdrop-filter: blur(12px);
  }
  .logo {
    font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em;
    color: var(--accent);
  }
  .logo span { color: var(--text); }
  .xp-bar-wrap { display:flex; align-items:center; gap:10px; }
  .xp-label { font-size: .75rem; color: var(--muted); font-family: var(--font-code); }
  .xp-track {
    width:160px; height:8px; background:var(--panel); border-radius:99px; overflow:hidden;
  }
  .xp-fill {
    height:100%; background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius:99px; transition: width .4s ease;
    width: 0%;
  }
  .xp-count { font-family:var(--font-code); font-size:.75rem; color:var(--accent); }
  .streak-badge {
    background: var(--accent2); color:#fff;
    font-family:var(--font-code); font-size:.7rem; font-weight:700;
    padding:3px 8px; border-radius:99px;
  }

  /* ── MAIN LAYOUT ────────────────────────────────────── */
  .app {
    position:relative; z-index:5;
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: auto 1fr;
    height: calc(100vh - 61px);
  }

  /* ── LESSON SIDEBAR ─────────────────────────────────── */
  .sidebar {
    background: var(--surface);
    border-right: 1px solid var(--border);
    overflow-y: auto;
    grid-row: 1 / 3;
  }
  .sidebar::-webkit-scrollbar { width:4px; }
  .sidebar::-webkit-scrollbar-track { background: transparent; }
  .sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius:99px; }

  .sidebar-head {
    padding: 20px 20px 12px;
    font-size: .65rem; letter-spacing:.15em; text-transform:uppercase;
    color: var(--muted); font-family:var(--font-code);
    border-bottom: 1px solid var(--border);
  }
  .lesson-item {
    display: flex; align-items: center; gap:12px;
    padding: 13px 20px;
    cursor: pointer;
    border-left: 3px solid transparent;
    transition: background .15s, border-color .15s;
    position: relative;
  }
  .lesson-item:hover { background: var(--panel); }
  .lesson-item.active {
    background: var(--panel);
    border-left-color: var(--accent);
  }
  .lesson-item.done .lesson-num { background: var(--green); color: #0d0f14; }
  .lesson-num {
    width:26px; height:26px; border-radius:6px; flex-shrink:0;
    background: var(--border); color: var(--muted);
    font-family:var(--font-code); font-size:.7rem; font-weight:700;
    display:flex; align-items:center; justify-content:center;
    transition: background .2s, color .2s;
  }
  .lesson-item.active .lesson-num { background:var(--accent); color:#0d0f14; }
  .lesson-title { font-size:.85rem; font-weight:600; }
  .lesson-sub { font-size:.7rem; color:var(--muted); margin-top:1px; }
  .lesson-lock { margin-left:auto; font-size:.7rem; color:var(--border); }

  /* ── TUTORIAL PANEL ─────────────────────────────────── */
  .tutorial-panel {
    padding: 28px 32px;
    overflow-y: auto;
    border-bottom: 1px solid var(--border);
    max-height: 46%;
  }
  .tutorial-panel::-webkit-scrollbar { width:4px; }
  .tutorial-panel::-webkit-scrollbar-thumb { background: var(--border); border-radius:99px; }

  .lesson-header {
    display:flex; align-items:flex-start; justify-content:space-between;
    margin-bottom: 20px;
  }
  .lesson-badge {
    font-family: var(--font-code); font-size:.65rem; letter-spacing:.1em;
    text-transform:uppercase; color:var(--accent); background:rgba(240,192,64,.1);
    border:1px solid rgba(240,192,64,.25); padding:3px 9px; border-radius:4px;
  }
  h1.lesson-title-main {
    font-size: 1.6rem; font-weight:800; letter-spacing:-.03em;
    margin: 8px 0 4px; line-height:1.2;
  }
  .lesson-desc { font-size:.9rem; color:var(--muted); line-height:1.6; }

  /* steps */
  .step-block {
    margin: 20px 0;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }
  .step-head {
    display:flex; align-items:center; gap:10px;
    padding: 12px 16px;
    background: rgba(255,255,255,.03);
    border-bottom: 1px solid var(--border);
  }
  .step-num-badge {
    width:22px; height:22px; border-radius:5px;
    background: var(--accent); color:#0d0f14;
    font-family:var(--font-code); font-size:.7rem; font-weight:700;
    display:flex; align-items:center; justify-content:center;
  }
  .step-title { font-size:.85rem; font-weight:700; }
  .step-body { padding:14px 16px; font-size:.85rem; line-height:1.7; color:var(--text); }
  .step-body code {
    font-family: var(--font-code); font-size:.8rem;
    background: rgba(240,192,64,.1); color:var(--accent);
    padding: 1px 5px; border-radius:3px;
  }
  .step-body .hint {
    margin-top:10px; padding:10px 14px;
    background: rgba(78,203,141,.07); border-left:3px solid var(--green);
    border-radius:0 6px 6px 0; font-size:.82rem; color:var(--green);
  }
  .step-body .warn {
    margin-top:10px; padding:10px 14px;
    background: rgba(224,90,58,.07); border-left:3px solid var(--accent2);
    border-radius:0 6px 6px 0; font-size:.82rem; color:var(--accent2);
  }

  /* ── EDITOR + OUTPUT ────────────────────────────────── */
  .editor-zone {
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }
  .editor-wrap {
    display:flex; flex-direction:column;
    border-right: 1px solid var(--border);
  }
  .pane-bar {
    display:flex; align-items:center; justify-content:space-between;
    padding: 10px 16px;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    flex-shrink:0;
  }
  .pane-title {
    font-family:var(--font-code); font-size:.72rem; letter-spacing:.1em;
    text-transform:uppercase; color:var(--muted);
    display:flex; align-items:center; gap:8px;
  }
  .dot { width:8px; height:8px; border-radius:50%; }
  .dot.y { background:#f0c040; } .dot.o { background:#e05a3a; } .dot.g { background:#4ecb8d; }

  #code-editor {
    flex:1; background: var(--bg); color: var(--text);
    font-family: var(--font-code); font-size:.82rem; line-height:1.7;
    border:none; resize:none; padding:20px;
    outline:none; tab-size:2;
    overflow-y: auto;
  }
  #code-editor::-webkit-scrollbar { width:4px; }
  #code-editor::-webkit-scrollbar-thumb { background:var(--border); border-radius:99px; }

  .editor-actions {
    display:flex; gap:8px;
    padding: 10px 16px;
    background: var(--surface);
    border-top: 1px solid var(--border);
    flex-shrink:0;
  }
  .btn {
    font-family: var(--font-head); font-size:.8rem; font-weight:700;
    padding: 8px 18px; border-radius:6px; border:none; cursor:pointer;
    transition: transform .1s, opacity .15s;
  }
  .btn:active { transform: scale(.97); }
  .btn-run {
    background: var(--accent); color:#0d0f14;
    display:flex; align-items:center; gap:6px;
  }
  .btn-run:hover { opacity:.88; }
  .btn-clear { background:var(--panel); color:var(--muted); }
  .btn-clear:hover { color:var(--text); }
  .btn-hint { background:rgba(78,203,141,.12); color:var(--green); border:1px solid rgba(78,203,141,.3); }
  .btn-hint:hover { background:rgba(78,203,141,.2); }
  .btn-check { background:rgba(224,90,58,.12); color:var(--accent2); border:1px solid rgba(224,90,58,.3); }
  .btn-check:hover { background:rgba(224,90,58,.2); }

  /* ── OUTPUT PANEL ───────────────────────────────────── */
  .output-wrap {
    display:flex; flex-direction:column;
  }
  #output {
    flex:1; overflow-y:auto; padding:20px;
    font-family: var(--font-code); font-size:.82rem; line-height:1.7;
    background: var(--bg);
  }
  #output::-webkit-scrollbar { width:4px; }
  #output::-webkit-scrollbar-thumb { background:var(--border); border-radius:99px; }
  .out-line { padding: 1px 0; }
  .out-line.log { color: var(--text); }
  .out-line.error { color: var(--red); }
  .out-line.success { color: var(--green); }
  .out-line.info { color: var(--accent); }
  .out-line.warn-line { color: var(--accent2); }
  .output-empty {
    color: var(--muted); font-size:.8rem;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    height:100%; gap:8px; text-align:center; padding:20px;
  }
  .output-empty .arrow { font-size:1.8rem; }

  /* ── CHALLENGE BANNER ───────────────────────────────── */
  .challenge-strip {
    padding: 10px 20px;
    background: rgba(240,192,64,.06);
    border-top: 1px solid rgba(240,192,64,.2);
    font-size:.78rem; line-height:1.5; color:var(--muted);
    flex-shrink:0;
  }
  .challenge-strip strong { color:var(--accent); font-family:var(--font-code); }

  /* ── TOAST NOTIFICATION ─────────────────────────────── */
  #toast {
    position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(20px);
    background:var(--panel); border:1px solid var(--border);
    padding:10px 22px; border-radius:8px;
    font-size:.83rem; font-weight:600;
    opacity:0; pointer-events:none;
    transition: opacity .3s, transform .3s;
    z-index:999;
  }
  #toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
  #toast.success { border-color:var(--green); color:var(--green); }
  #toast.error { border-color:var(--red); color:var(--red); }
  #toast.info { border-color:var(--accent); color:var(--accent); }

  /* ── CONCEPT CHIPS ──────────────────────────────────── */
  .concept-chips {
    display:flex; flex-wrap:wrap; gap:6px; margin: 12px 0;
  }
  .chip {
    font-family:var(--font-code); font-size:.68rem;
    padding:3px 9px; border-radius:4px;
    background:var(--panel); border:1px solid var(--border); color:var(--muted);
  }
  .chip.active { background:rgba(240,192,64,.12); border-color:rgba(240,192,64,.4); color:var(--accent); }

  /* ── PROGRESS RING ──────────────────────────────────── */
  .progress-ring-wrap {
    padding:16px 20px; border-bottom:1px solid var(--border);
    display:flex; align-items:center; gap:14px;
  }
  .progress-ring { transform:rotate(-90deg); }
  .ring-bg { fill:none; stroke:var(--border); stroke-width:3; }
  .ring-fill {
    fill:none; stroke:var(--accent); stroke-width:3; stroke-linecap:round;
    stroke-dasharray:100 100;
    stroke-dashoffset:100;
    transition: stroke-dashoffset .5s ease;
  }
  .ring-label { font-size:.72rem; color:var(--muted); }
  .ring-pct { font-size:1.1rem; font-weight:800; color:var(--accent); line-height:1; }

  /* ── SCROLLBARS ─────────────────────────────────────── */
  html { scroll-behavior: smooth; }

  /* ── RUN ANIMATION ──────────────────────────────────── */
  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(6px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .out-line { animation: fadeInUp .15s ease both; }

  /* ── GLOW ───────────────────────────────────────────── */
  .btn-run:hover {
    box-shadow: 0 0 18px rgba(240,192,64,.35);
  }
</style>
</head>
<body>

<!-- ── HEADER ──────────────────────────────────────── -->
<header>
  <div class="logo">JS<span>Forge</span></div>
  <div class="xp-bar-wrap">
    <span class="xp-label">XP</span>
    <div class="xp-track"><div class="xp-fill" id="xp-fill"></div></div>
    <span class="xp-count" id="xp-count">0 / 100</span>
    <span class="streak-badge" id="streak">🔥 0</span>
  </div>
</header>

<!-- ── APP GRID ─────────────────────────────────────── -->
<div class="app">

  <!-- ── SIDEBAR ──────────────────────────────────────── -->
  <aside class="sidebar">
    <div class="sidebar-head">Lesson Track</div>

    <div class="progress-ring-wrap">
      <svg width="44" height="44" class="progress-ring">
        <circle class="ring-bg" cx="22" cy="22" r="16"/>
        <circle class="ring-fill" id="ring-fill" cx="22" cy="22" r="16"/>
      </svg>
      <div>
        <div class="ring-pct" id="ring-pct">0%</div>
        <div class="ring-label">Lessons complete</div>
      </div>
    </div>

    <!-- Lessons are injected by JS -->
    <div id="lesson-list"></div>
  </aside>

  <!-- ── TUTORIAL PANEL ────────────────────────────────── -->
  <div class="tutorial-panel" id="tutorial-panel">
    <!-- Filled by JS -->
  </div>

  <!-- ── EDITOR + OUTPUT ───────────────────────────────── -->
  <div class="editor-zone">

    <div class="editor-wrap">
      <div class="pane-bar">
        <div class="pane-title">
          <div class="dot y"></div><div class="dot o"></div><div class="dot g"></div>
          &nbsp;editor.js
        </div>
        <span style="font-family:var(--font-code);font-size:.68rem;color:var(--muted)">JavaScript Playground</span>
      </div>
      <textarea id="code-editor" spellcheck="false" placeholder="// Start typing your JavaScript here...
// The output will appear on the right panel.
"></textarea>
      <div class="editor-actions">
        <button class="btn btn-run" onclick="runCode()">▶ Run</button>
        <button class="btn btn-clear" onclick="clearEditor()">✕ Clear</button>
        <button class="btn btn-hint" onclick="showHint()">💡 Hint</button>
        <button class="btn btn-check" onclick="checkAnswer()">✔ Check</button>
      </div>
      <div class="challenge-strip" id="challenge-strip">
        <strong>CHALLENGE →</strong> Load a lesson to see your challenge.
      </div>
    </div>

    <div class="output-wrap">
      <div class="pane-bar">
        <div class="pane-title">
          <div class="dot g"></div>&nbsp;console output
        </div>
        <button class="btn btn-clear" style="padding:4px 10px;font-size:.7rem" onclick="clearOutput()">Clear</button>
      </div>
      <div id="output">
        <div class="output-empty">
          <div class="arrow">⚡</div>
          <div>Hit <strong style="color:var(--accent)">▶ Run</strong> to see output here.</div>
          <div style="font-size:.72rem;margin-top:4px;">console.log() prints to this panel.</div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ── TOAST ─────────────────────────────────────────── -->
<div id="toast"></div>

<script>
/* ═══════════════════════════════════════════════════════════
   JS FORGE — CORE APPLICATION
   ═══════════════════════════════════════════════════════════ */

// ── XP & GAMIFICATION STATE ────────────────────────────────
let xp = 0;           // experience points earned
let streak = 0;       // number of correct answers in a row
let doneLessons = {}; // tracks which lessons have been completed

// ── LESSON DATA ────────────────────────────────────────────
// Each lesson has: title, badge, description, steps, starter code,
//                  challenge text, answer check function, hint, and concepts.
const lessons = [
  {
    id: 0,
    title: "What is JavaScript?",
    sub: "Intro",
    badge: "LESSON 1",
    desc: "JavaScript is the language that makes websites interactive — think buttons, animations, games. It runs right inside your browser. No installation needed!",
    concepts: ["browser", "interactive", "console"],
    steps: [
      {
        num: 1,
        title: "Meet the Console",
        body: `The <code>console</code> is like your notebook — a place you can print messages, numbers, or anything you want to see. Use <code>console.log()</code> to print something. Think of <code>log</code> as "write this down."`,
        hint: `console.log("Hello, World!") is traditionally the very first program anyone writes.`
      },
      {
        num: 2,
        title: "Strings vs Numbers",
        body: `In JavaScript, words wrapped in quotes are called <strong>strings</strong>: <code>"Hello"</code>. Numbers stand alone without quotes: <code>42</code>. This is important — JavaScript treats them differently.
        <div class="hint">Rule of 3: <code>"apple"</code> is a string. <code>99</code> is a number. <code>true</code> is a boolean (yes/no value).</div>`,
      },
      {
        num: 3,
        title: "Your Turn",
        body: `Type <code>console.log("Hello, World!");</code> in the editor and hit ▶ Run. Watch the right panel light up!
        <div class="warn">Semicolons <code>;</code> end a JavaScript statement — like a period ends a sentence.</div>`
      }
    ],
    starter: `// Welcome to JSForge! 🔥
// This is a comment — JavaScript ignores it.
// Comments are notes for YOU (and other humans).

// Type your first line below:

`,
    challenge: "Print exactly: Hello, World! — to the console.",
    hint: `console.log("Hello, World!");`,
    check: (output) => output.includes("Hello, World!")
  },

  {
    id: 1,
    title: "Variables",
    sub: "let, const, var",
    badge: "LESSON 2",
    desc: "Variables are like labeled boxes. You put a value inside and give it a name so you can use it later. JavaScript has three keywords for this: let, const, and var.",
    concepts: ["let", "const", "var", "declaration"],
    steps: [
      {
        num: 1,
        title: "let — a changeable box",
        body: `<code>let age = 13;</code> creates a box named <code>age</code> and puts <code>13</code> inside. You can change it later: <code>age = 14;</code>
        <div class="hint">Use <code>let</code> when the value might change — like a score counter.</div>`
      },
      {
        num: 2,
        title: "const — a sealed box",
        body: `<code>const name = "Rob";</code> creates a box you can NEVER change. Good for things that stay the same.
        <div class="warn">Try to reassign a <code>const</code> and JavaScript will throw an error!</div>`
      },
      {
        num: 3,
        title: "Logging Variables",
        body: `You can pass a variable directly into console.log — no quotes needed: <code>console.log(age);</code>. You can even mix text and variables: <code>console.log("My age is", age);</code>`
      }
    ],
    starter: `// VARIABLES LESSON
// Create your own variables below!

let myName = ""; // put your name between the quotes
let myAge = 0;   // replace 0 with your age

// Now print them out:
console.log(myName);
console.log(myAge);
`,
    challenge: "Create a variable called 'score' set to 100, then print it.",
    hint: `let score = 100;\nconsole.log(score);`,
    check: (output) => output.includes("100")
  },

  {
    id: 2,
    title: "Math & Operators",
    sub: "+, -, *, /",
    badge: "LESSON 3",
    desc: "JavaScript is a calculator too. You can add, subtract, multiply, and divide — and even combine that with variables.",
    concepts: ["operators", "arithmetic", "expressions"],
    steps: [
      {
        num: 1,
        title: "Basic Operators",
        body: `The four main operators:
        <br>• <code>+</code> add
        <br>• <code>-</code> subtract
        <br>• <code>*</code> multiply
        <br>• <code>/</code> divide
        <br>Example: <code>let result = 10 + 5;</code> stores <code>15</code>.`
      },
      {
        num: 2,
        title: "Modulo — The Remainder Operator",
        body: `<code>%</code> gives you the REMAINDER after division. Example: <code>10 % 3</code> = <code>1</code> (because 10 ÷ 3 = 3 remainder 1).
        <div class="hint">Pro trick: <code>number % 2 === 0</code> tells you if a number is even!</div>`
      },
      {
        num: 3,
        title: "String Concatenation",
        body: `<code>+</code> with strings GLUES them together: <code>"Hello" + " " + "World"</code> → <code>"Hello World"</code>. This is called <strong>concatenation</strong>.`
      }
    ],
    starter: `// MATH LESSON
let a = 20;
let b = 5;

// Try each operator:
console.log(a + b);  // addition
console.log(a - b);  // subtraction
console.log(a * b);  // multiplication
console.log(a / b);  // division
console.log(a % b);  // modulo (remainder)
`,
    challenge: "Create variables x=15 and y=4. Print their sum AND their product.",
    hint: `let x = 15;\nlet y = 4;\nconsole.log(x + y);\nconsole.log(x * y);`,
    check: (output) => output.includes("19") && output.includes("60")
  },

  {
    id: 3,
    title: "If / Else",
    sub: "Decisions",
    badge: "LESSON 4",
    desc: "Programs need to make decisions. 'If this is true, do this. Otherwise, do that.' That's exactly what if/else does.",
    concepts: ["if", "else", "comparison", "boolean"],
    steps: [
      {
        num: 1,
        title: "The if Statement",
        body: `<code>if (condition) { ... }</code> — the code inside <code>{ }</code> only runs if the condition is <code>true</code>.
        <br><br>Example:<br><code>if (age >= 13) { console.log("Teen!"); }</code>`
      },
      {
        num: 2,
        title: "Comparison Operators",
        body: `These create true/false conditions:
        <br>• <code>===</code> exactly equal
        <br>• <code>!==</code> NOT equal
        <br>• <code>></code> greater than
        <br>• <code><</code> less than
        <div class="warn">Use <code>===</code> (triple equals), NOT <code>=</code> (assignment). Common beginner mistake!</div>`
      },
      {
        num: 3,
        title: "else — the fallback",
        body: `Add <code>else { ... }</code> after your <code>if</code> to handle the "otherwise" case.
        <br><br><code>if (score > 50) { console.log("Pass"); } else { console.log("Fail"); }</code>`
      }
    ],
    starter: `// IF / ELSE LESSON
let score = 75;

if (score >= 60) {
  console.log("You passed! 🎉");
} else {
  console.log("Keep trying! 💪");
}

// Try changing score to 40 — what happens?
`,
    challenge: "Write an if/else: if temperature > 30 print 'Hot!' else print 'Cool!'",
    hint: `let temperature = 35;\nif (temperature > 30) {\n  console.log("Hot!");\n} else {\n  console.log("Cool!");\n}`,
    check: (output) => output.includes("Hot!") || output.includes("Cool!")
  },

  {
    id: 4,
    title: "Functions",
    sub: "Reusable Code Blocks",
    badge: "LESSON 5",
    desc: "A function is a named block of code you can run whenever you want. Think of it like a recipe — write it once, use it forever.",
    concepts: ["function", "parameter", "return", "call"],
    steps: [
      {
        num: 1,
        title: "Defining a Function",
        body: `<code>function greet() { console.log("Hello!"); }</code>
        <br>This DEFINES the function but doesn't run it yet. It's like writing a recipe in a cookbook.`
      },
      {
        num: 2,
        title: "Calling a Function",
        body: `<code>greet();</code> — the parentheses are the trigger. This is called <strong>invoking</strong> the function.
        <div class="hint">You can call the same function 100 times. That's the power of functions — write once, reuse forever.</div>`
      },
      {
        num: 3,
        title: "Parameters & Return",
        body: `Functions can accept inputs (<strong>parameters</strong>) and send back a result (<strong>return</strong>).
        <br><br><code>function add(a, b) { return a + b; }</code>
        <br><code>console.log(add(3, 4)); // prints 7</code>`
      }
    ],
    starter: `// FUNCTIONS LESSON

// Step 1: Define a function
function sayHello(name) {
  // 'name' is a parameter — it gets filled when you call the function
  console.log("Hello, " + name + "!");
}

// Step 2: Call it with different names
sayHello("Rob");
sayHello("World");

// Step 3: Try a function that RETURNS a value
function multiply(x, y) {
  return x * y; // sends the result back to whoever called it
}

let answer = multiply(6, 7);
console.log("6 x 7 =", answer);
`,
    challenge: "Write a function called 'square' that takes a number and returns it multiplied by itself. Call it with 9.",
    hint: `function square(n) {\n  return n * n;\n}\nconsole.log(square(9)); // prints 81`,
    check: (output) => output.includes("81")
  },

  {
    id: 5,
    title: "Arrays",
    sub: "Lists of Data",
    badge: "LESSON 6",
    desc: "Arrays are ordered lists. Instead of 10 separate variables, use one array to hold all 10 values. Essential for any real program.",
    concepts: ["array", "index", "length", "push"],
    steps: [
      {
        num: 1,
        title: "Creating an Array",
        body: `<code>let fruits = ["apple", "banana", "mango"];</code>
        <br>Square brackets <code>[ ]</code> hold the items, separated by commas.`
      },
      {
        num: 2,
        title: "Accessing Items by Index",
        body: `Arrays are <strong>zero-indexed</strong> — counting starts at 0!
        <br><code>fruits[0]</code> → <code>"apple"</code>
        <br><code>fruits[1]</code> → <code>"banana"</code>
        <div class="warn">First item is index 0, NOT 1. This trips up beginners all the time!</div>`
      },
      {
        num: 3,
        title: "Useful Array Methods",
        body: `• <code>fruits.length</code> → number of items
        <br>• <code>fruits.push("orange")</code> → adds to the end
        <br>• <code>fruits.pop()</code> → removes the last item
        <br>• <code>fruits[0] = "grape"</code> → changes an item`
      }
    ],
    starter: `// ARRAYS LESSON
let colors = ["red", "green", "blue"];

console.log(colors[0]);      // first item
console.log(colors.length);  // how many items?

colors.push("yellow");       // add to the end
console.log(colors);         // see the whole array

// Access the LAST item (length - 1):
console.log(colors[colors.length - 1]);
`,
    challenge: "Create an array of 3 of your favorite foods. Print the second one.",
    hint: `let foods = ["pizza", "tacos", "ramen"];\nconsole.log(foods[1]); // "tacos"`,
    check: (output) => output.trim().length > 0
  },

  {
    id: 6,
    title: "Loops",
    sub: "Repeat Without Repeating",
    badge: "LESSON 7",
    desc: "Loops let you run the same code multiple times without copy-pasting. They're one of the most powerful tools in programming.",
    concepts: ["for", "while", "iteration", "loop"],
    steps: [
      {
        num: 1,
        title: "The for Loop",
        body: `<code>for (let i = 0; i < 5; i++) { console.log(i); }</code>
        <br>Three parts inside the parentheses:
        <br>1. <code>let i = 0</code> — start at 0
        <br>2. <code>i < 5</code> — keep going while this is true
        <br>3. <code>i++</code> — add 1 each time (<code>++</code> means +1)`
      },
      {
        num: 2,
        title: "Looping Through Arrays",
        body: `Combine loops + arrays to process every item:
        <br><code>for (let i = 0; i < fruits.length; i++) {</code>
        <br><code>&nbsp;&nbsp;console.log(fruits[i]);</code>
        <br><code>}</code>
        <div class="hint">Modern shortcut: <code>for (let fruit of fruits)</code> does the same thing, cleaner!</div>`
      },
      {
        num: 3,
        title: "While Loops",
        body: `<code>while (condition) { ... }</code> keeps running as long as the condition is true.
        <div class="warn">Always make sure the condition eventually becomes false — or your loop runs FOREVER (an infinite loop crashes the page).</div>`
      }
    ],
    starter: `// LOOPS LESSON

// for loop: count from 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}

// Loop through an array
let animals = ["cat", "dog", "bird"];
for (let animal of animals) {
  console.log("Animal:", animal);
}
`,
    challenge: "Use a loop to print the numbers 1 through 10.",
    hint: `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}`,
    check: (output) => {
      // Check that numbers 1–10 all appear in output
      for (let i = 1; i <= 10; i++) {
        if (!output.includes(String(i))) return false;
      }
      return true;
    }
  },

  {
    id: 7,
    title: "Objects",
    sub: "Key-Value Pairs",
    badge: "LESSON 8",
    desc: "Objects group related data together. Instead of separate variables for name, age, and score — one object holds them all.",
    concepts: ["object", "property", "key", "value"],
    steps: [
      {
        num: 1,
        title: "Creating an Object",
        body: `<code>let player = { name: "Rob", score: 100, level: 3 };</code>
        <br>Curly braces <code>{ }</code> hold <strong>key: value</strong> pairs separated by commas.`
      },
      {
        num: 2,
        title: "Accessing Properties",
        body: `Two ways to get a value:
        <br>• Dot notation: <code>player.name</code> → <code>"Rob"</code>
        <br>• Bracket notation: <code>player["score"]</code> → <code>100</code>
        <div class="hint">Dot notation is cleaner for most cases. Use brackets when the key name is stored in a variable.</div>`
      },
      {
        num: 3,
        title: "Updating & Adding Properties",
        body: `<code>player.score = 200;</code> — updates an existing property.
        <br><code>player.health = 50;</code> — adds a NEW property on the fly.
        <br>Objects are flexible — you can always add more data.`
      }
    ],
    starter: `// OBJECTS LESSON
let car = {
  brand: "Toyota",
  model: "Camry",
  year: 2023,
  color: "silver"
};

// Access properties:
console.log(car.brand);
console.log(car.year);

// Update a property:
car.color = "black";
console.log("New color:", car.color);

// Add a new property:
car.mileage = 5000;
console.log("Mileage:", car.mileage);
`,
    challenge: "Create an object called 'person' with name, age, and city. Print all three properties.",
    hint: `let person = { name: "Rob", age: 30, city: "Chicago" };\nconsole.log(person.name);\nconsole.log(person.age);\nconsole.log(person.city);`,
    check: (output) => output.trim().split('\n').length >= 3
  }
];

/* ═══════════════════════════════════════════════════════════
   RENDER ENGINE
   ═══════════════════════════════════════════════════════════ */

let currentLesson = 0; // tracks which lesson is active

// ── BUILD SIDEBAR LESSON LIST ──────────────────────────────
function buildSidebar() {
  const list = document.getElementById('lesson-list');
  list.innerHTML = '';

  lessons.forEach((l, i) => {
    const div = document.createElement('div');
    div.className = 'lesson-item' +
      (i === currentLesson ? ' active' : '') +
      (doneLessons[i] ? ' done' : '');

    div.innerHTML = `
      <div class="lesson-num">${doneLessons[i] ? '✓' : i + 1}</div>
      <div>
        <div class="lesson-title">${l.title}</div>
        <div class="lesson-sub">${l.sub}</div>
      </div>
    `;

    div.addEventListener('click', () => loadLesson(i));
    list.appendChild(div);
  });

  // Update progress ring
  const pct = Math.round((Object.keys(doneLessons).length / lessons.length) * 100);
  const circumference = 2 * Math.PI * 16; // radius is 16
  const offset = circumference - (pct / 100) * circumference;
  document.getElementById('ring-fill').style.strokeDasharray = `${circumference} ${circumference}`;
  document.getElementById('ring-fill').style.strokeDashoffset = offset;
  document.getElementById('ring-pct').textContent = pct + '%';
}

// ── LOAD A LESSON INTO THE TUTORIAL PANEL ─────────────────
function loadLesson(index) {
  currentLesson = index;
  const l = lessons[index];

  // Build concept chips
  const chips = l.concepts.map(c =>
    `<span class="chip active">${c}</span>`
  ).join('');

  // Build step blocks
  const stepsHTML = l.steps.map(s => `
    <div class="step-block">
      <div class="step-head">
        <div class="step-num-badge">${s.num}</div>
        <div class="step-title">${s.title}</div>
      </div>
      <div class="step-body">${s.body}${s.hint ? `<div class="hint">💡 ${s.hint}</div>` : ''}</div>
    </div>
  `).join('');

  // Inject into the tutorial panel
  document.getElementById('tutorial-panel').innerHTML = `
    <div class="lesson-header">
      <div>
        <span class="lesson-badge">${l.badge}</span>
        <h1 class="lesson-title-main">${l.title}</h1>
        <p class="lesson-desc">${l.desc}</p>
      </div>
    </div>
    <div class="concept-chips">${chips}</div>
    ${stepsHTML}
  `;

  // Load the starter code into the editor
  document.getElementById('code-editor').value = l.starter;

  // Update challenge strip
  document.getElementById('challenge-strip').innerHTML =
    `<strong>CHALLENGE →</strong> ${l.challenge}`;

  // Clear output
  clearOutput();

  // Rebuild sidebar to update active state
  buildSidebar();
}

/* ═══════════════════════════════════════════════════════════
   SAFE CODE EXECUTOR
   Intercepts console.log so output goes to our panel,
   not the real browser console.
   ═══════════════════════════════════════════════════════════ */

let capturedOutput = ''; // stores the text for challenge checking

function runCode() {
  const code = document.getElementById('code-editor').value;
  if (!code.trim()) { showToast('Nothing to run!', 'info'); return; }

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // clear previous output
  capturedOutput = '';

  // Override console.log to capture output into our panel
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  // Helper: appends a line to the output panel
  function printLine(text, type = 'log') {
    const line = document.createElement('div');
    line.className = `out-line ${type}`;
    line.textContent = String(text);
    outputDiv.appendChild(line);
    capturedOutput += String(text) + '\n'; // save for challenge check
  }

  // Redirect console methods
  console.log = (...args) => {
    printLine(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    originalLog(...args);
  };
  console.error = (...args) => {
    printLine(args.join(' '), 'error');
    originalError(...args);
  };
  console.warn = (...args) => {
    printLine(args.join(' '), 'warn-line');
    originalWarn(...args);
  };

  // Run the user's code inside a try/catch so errors don't crash the page
  try {
    // Using Function() constructor to run the code in a sandboxed scope
    const fn = new Function(code);
    fn();

    // If nothing was logged, show a friendly message
    if (outputDiv.children.length === 0) {
      printLine('(no output — did you forget console.log?)', 'info');
    }

  } catch (err) {
    // Show the error clearly in the output panel
    printLine('❌ Error: ' + err.message, 'error');
    printLine('Line hint: Check your spelling and brackets.', 'info');
  } finally {
    // Always restore the original console methods
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }
}

/* ═══════════════════════════════════════════════════════════
   CHALLENGE CHECKER
   ═══════════════════════════════════════════════════════════ */

function checkAnswer() {
  const l = lessons[currentLesson];

  if (capturedOutput === '') {
    showToast('Run your code first!', 'info');
    return;
  }

  const passed = l.check(capturedOutput);

  if (passed) {
    // Award XP
    if (!doneLessons[currentLesson]) {
      xp += 25;
      streak++;
      doneLessons[currentLesson] = true;
      updateXP();
      buildSidebar();
    }
    showToast('✅ Challenge passed! +25 XP', 'success');

    // Auto-advance to next lesson after a short delay
    if (currentLesson < lessons.length - 1) {
      setTimeout(() => loadLesson(currentLesson + 1), 1500);
    }
  } else {
    streak = 0;
    showToast('Not quite — check the challenge and hint! 💪', 'error');
  }
  updateStreak();
}

/* ═══════════════════════════════════════════════════════════
   HINT SYSTEM
   ═══════════════════════════════════════════════════════════ */

function showHint() {
  const l = lessons[currentLesson];
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';
  const line = document.createElement('div');
  line.className = 'out-line info';
  line.textContent = '💡 Hint: ' + l.hint;
  outputDiv.appendChild(line);
  xp = Math.max(0, xp - 5); // small XP penalty for using hint
  updateXP();
  showToast('Hint revealed! (-5 XP)', 'info');
}

/* ═══════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

// Clear the editor textarea
function clearEditor() {
  document.getElementById('code-editor').value = '';
  document.getElementById('code-editor').focus();
}

// Clear the output panel
function clearOutput() {
  document.getElementById('output').innerHTML = `
    <div class="output-empty">
      <div class="arrow">⚡</div>
      <div>Hit <strong style="color:var(--accent)">▶ Run</strong> to see output here.</div>
      <div style="font-size:.72rem;margin-top:4px;">console.log() prints to this panel.</div>
    </div>`;
  capturedOutput = '';
}

// Update the XP bar in the header
function updateXP() {
  const maxXP = lessons.length * 25; // max possible XP
  const fill = Math.min(100, (xp / maxXP) * 100);
  document.getElementById('xp-fill').style.width = fill + '%';
  document.getElementById('xp-count').textContent = xp + ' / ' + maxXP;
}

// Update the streak badge
function updateStreak() {
  document.getElementById('streak').textContent = '🔥 ' + streak;
}

// Show a toast notification
let toastTimer;
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = ''; }, 2800);
}

// Allow Tab key to insert 2 spaces (instead of jumping focus)
document.getElementById('code-editor').addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 2; // move cursor after spaces
  }

  // Ctrl+Enter or Cmd+Enter to run
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    runCode();
  }
});

/* ═══════════════════════════════════════════════════════════
   BOOT — load first lesson on page ready
   ═══════════════════════════════════════════════════════════ */
loadLesson(0);
buildSidebar();

</script>
</body>
</html>

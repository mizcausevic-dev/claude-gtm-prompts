import { artifacts, executionLane, promptLibrary, summary, verification } from "./gtmPromptsService";

function pageShell(title: string, activeRoute: string, body: string) {
  const nav = [
    { href: "/", label: "Overview & Export" },
    { href: "/prompt-library", label: "Prompt Library" },
    { href: "/execution-lane", label: "Execution Lane" },
    { href: "/verification", label: "Operator Verification" },
    { href: "/docs", label: "Integration Docs" }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --bg: #09101d;
      --panel: rgba(15, 23, 42, 0.9);
      --border: rgba(148, 163, 184, 0.18);
      --text: #e7eefb;
      --muted: #9eb1cf;
      --blue: #60a5fa;
      --green: #34d399;
      --amber: #fbbf24;
      --red: #fb7185;
      --mono: "IBM Plex Mono", Consolas, monospace;
      --sans: "IBM Plex Sans", "Segoe UI", sans-serif;
      --serif: "IBM Plex Serif", Georgia, serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: var(--sans);
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(59, 130, 246, 0.16), transparent 22%),
        radial-gradient(circle at top right, rgba(16, 185, 129, 0.12), transparent 18%),
        var(--bg);
    }
    .wrap { width: min(1360px, calc(100% - 48px)); margin: 24px auto 48px; }
    .hero {
      display: grid;
      grid-template-columns: 1fr 260px;
      gap: 24px;
      padding: 28px 32px;
      border: 1px solid var(--border);
      border-radius: 28px;
      background: rgba(9, 16, 29, 0.86);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
    }
    .eyebrow, .tab, .mini, .pill, .kicker {
      font-family: var(--mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .eyebrow {
      display: inline-flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 18px;
      color: var(--muted);
      font-size: 13px;
    }
    .eyebrow strong {
      color: #7db5ff;
      border: 1px solid rgba(59,130,246,0.35);
      padding: 9px 14px;
      border-radius: 8px;
    }
    h1 {
      margin: 0 0 10px;
      font-family: var(--serif);
      font-size: clamp(46px, 5vw, 72px);
      line-height: 0.98;
    }
    h1 span {
      background: linear-gradient(90deg, var(--blue), var(--green));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .lede {
      margin: 0;
      max-width: 980px;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.6;
    }
    .posture {
      border: 1px solid var(--border);
      border-radius: 20px;
      background: rgba(15, 23, 42, 0.94);
      padding: 28px 24px;
      align-self: start;
    }
    .posture .mini {
      color: #91a3c6;
      font-size: 12px;
      margin-bottom: 14px;
    }
    .status-line { font-size: 15px; font-family: var(--mono); font-weight: 600; }
    .tabs { display: flex; flex-wrap: wrap; gap: 16px; margin: 22px 0 34px; }
    .tab {
      display: inline-flex;
      align-items: center;
      padding: 17px 28px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: #93a7c7;
      background: rgba(15, 23, 42, 0.8);
      font-size: 14px;
      text-decoration: none;
    }
    .tab.active {
      color: white;
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      border-color: rgba(59,130,246,0.55);
      box-shadow: 0 18px 36px rgba(37, 99, 235, 0.3);
    }
    .section-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 26px;
      padding: 28px;
    }
    .metric-card { grid-column: span 3; min-height: 196px; }
    .panel-title {
      margin: 0 0 14px;
      color: var(--muted);
      font-size: 12px;
    }
    .metric {
      font-size: 62px;
      font-weight: 700;
      line-height: 0.95;
      margin-bottom: 14px;
    }
    .metric small {
      font-size: 32px;
      color: var(--amber);
    }
    .copy { color: var(--muted); font-size: 18px; line-height: 1.65; }
    .quote {
      grid-column: 1 / -1;
      border-color: rgba(251, 191, 36, 0.3);
      background: linear-gradient(180deg, rgba(17, 24, 39, 0.92), rgba(12, 18, 31, 0.96));
    }
    .quote strong { display: block; margin: 14px 0 12px; font-size: 18px; color: var(--amber); }
    .quote p { margin: 0; color: var(--text); font-size: 18px; line-height: 1.7; }
    .two-up { grid-column: span 6; }
    .list { display: grid; gap: 16px; margin-top: 18px; }
    .item {
      border: 1px solid rgba(148, 163, 184, 0.14);
      border-radius: 18px;
      padding: 18px 20px;
      background: rgba(2, 8, 23, 0.36);
    }
    .item-head {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: start;
      margin-bottom: 10px;
    }
    .item h3, .item h4 {
      margin: 0;
      font-size: 22px;
      line-height: 1.2;
    }
    .item p { margin: 0; color: var(--muted); line-height: 1.65; }
    .pill {
      display: inline-flex;
      align-items: center;
      padding: 7px 12px;
      border-radius: 999px;
      font-size: 12px;
      border: 1px solid var(--border);
    }
    .pill.healthy { color: #bbf7d0; background: rgba(16, 185, 129, 0.14); }
    .pill.watch { color: #fde68a; background: rgba(245, 158, 11, 0.14); }
    .pill.critical { color: #fecdd3; background: rgba(244, 63, 94, 0.14); }
    .code {
      margin-top: 16px;
      padding: 18px;
      border-radius: 18px;
      background: rgba(2, 8, 23, 0.84);
      border: 1px solid rgba(96, 165, 250, 0.16);
      color: #bfd4ff;
      font-family: var(--mono);
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      line-height: 1.6;
      font-size: 14px;
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }
    .meta span {
      color: #c8d6ef;
      background: rgba(96, 165, 250, 0.12);
      border: 1px solid rgba(96, 165, 250, 0.18);
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 12px;
    }
    .docs p, .docs li { color: var(--muted); line-height: 1.7; }
    code {
      font-family: var(--mono);
      color: #dbeafe;
      background: rgba(15, 23, 42, 0.85);
      padding: 2px 6px;
      border-radius: 6px;
    }
    @media (max-width: 1100px) {
      .hero { grid-template-columns: 1fr; }
      .metric-card, .two-up { grid-column: 1 / -1; }
    }
    @media (max-width: 720px) {
      .wrap { width: min(100% - 24px, 1360px); }
      .hero, .card { padding: 22px; }
      .tabs { gap: 12px; }
      .tab { width: 100%; justify-content: center; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div>
        <div class="eyebrow"><strong>Kinetic Gain</strong><span>System Control Plane</span></div>
        <h1>Claude <span>GTM Prompts</span></h1>
        <p class="lede">Versioned prompt packs for SEO, CRO, outbound, analytics, and ICP messaging. This repo models prompts as reusable GTM operating assets with owners, scores, review posture, and execution guidance.</p>
      </div>
      <aside class="posture">
        <div class="mini">Environment Posture</div>
        <div class="status-line">Live Prompt Operating Console</div>
      </aside>
    </section>
    <nav class="tabs">
      ${nav
        .map((item) => `<a class="tab ${item.href === activeRoute ? "active" : ""}" href="${item.href}">${item.label}</a>`)
        .join("")}
    </nav>
    ${body}
  </div>
</body>
</html>`;
}

function healthPill(health: string) {
  return `<span class="pill ${health}">${health}</span>`;
}

export function renderOverview() {
  const dashboard = summary();
  const packs = promptLibrary();
  const steps = executionLane();

  return pageShell(
    "Claude GTM Prompts",
    "/",
    `<section class="section-grid">
      <article class="card metric-card">
        <div class="panel-title kicker">Active Prompt Packs</div>
        <div class="metric">${dashboard.promptCount}</div>
        <div class="copy">Operator-owned prompt assets covering acquisition, conversion, analytics, and outbound support.</div>
      </article>
      <article class="card metric-card">
        <div class="panel-title kicker">Healthy / Watch</div>
        <div class="metric">${dashboard.healthy} <small>/ ${dashboard.attention}</small></div>
        <div class="copy">Prompt packs with current scoring posture versus packs needing revision or tighter review.</div>
      </article>
      <article class="card metric-card">
        <div class="panel-title kicker">Execution Steps</div>
        <div class="metric">${dashboard.executionCount}</div>
        <div class="copy">Distinct phases from prompt intake to score refresh after a launch or campaign cycle.</div>
      </article>
      <article class="card metric-card">
        <div class="panel-title kicker">Average Score</div>
        <div class="metric">${dashboard.averageScore}</div>
        <div class="copy">Composite usefulness rating across the active prompt library based on production fit.</div>
      </article>
      <article class="card quote">
        <div class="panel-title kicker">Critical Operating Recommendation</div>
        <strong>${dashboard.recommendation}</strong>
        <p>Best use case: teams that want AI-assisted GTM help without letting prompt drift quietly change messaging, proof posture, or analytics interpretation.</p>
      </article>
      <article class="card two-up">
        <div class="panel-title kicker">Top Prompt Packs</div>
        <div class="list">
          ${packs
            .slice(0, 3)
            .map(
              (item) => `<div class="item">
                <div class="item-head">
                  <h3>${item.title}</h3>
                  ${healthPill(item.health)}
                </div>
                <p>${item.focus}</p>
                <div class="meta">
                  <span>${item.owner}</span>
                  <span>Score ${item.score}</span>
                  <span>${item.promptPath}</span>
                </div>
              </div>`
            )
            .join("")}
        </div>
      </article>
      <article class="card two-up">
        <div class="panel-title kicker">Execution Snapshot</div>
        <div class="list">
          ${steps
            .slice(0, 3)
            .map(
              (step) => `<div class="item">
                <div class="item-head">
                  <h3>${step.name}</h3>
                  ${healthPill(step.health)}
                </div>
                <p><strong style="color:#dbeafe;">Trigger:</strong> ${step.trigger}</p>
                <p><strong style="color:#dbeafe;">Guardrail:</strong> ${step.guardrail}</p>
              </div>`
            )
            .join("")}
        </div>
      </article>
    </section>`
  );
}

export function renderPromptLibrary() {
  const packs = promptLibrary();
  const promptArtifacts = artifacts();

  return pageShell(
    "Claude GTM Prompts - Prompt Library",
    "/prompt-library",
    `<section class="section-grid">
      <article class="card" style="grid-column: 1 / -1;">
        <div class="panel-title kicker">Prompt Catalog</div>
        <div class="list">
          ${packs
            .map(
              (item) => `<div class="item">
                <div class="item-head">
                  <div>
                    <h3>${item.title}</h3>
                    <p>${item.focus}</p>
                  </div>
                  ${healthPill(item.health)}
                </div>
                <div class="meta">
                  <span>${item.id}</span>
                  <span>${item.owner}</span>
                  <span>Score ${item.score}</span>
                  ${item.channels.map((channel) => `<span>${channel}</span>`).join("")}
                </div>
                <div class="code">${item.output}

Notes: ${item.notes}
Path: ${item.promptPath}</div>
              </div>`
            )
            .join("")}
        </div>
      </article>
      <article class="card" style="grid-column: 1 / -1;">
        <div class="panel-title kicker">Prompt Artifact Samples</div>
        <div class="list">
          ${promptArtifacts
            .map(
              (artifact) => `<div class="item">
                <div class="item-head">
                  <h4>${artifact.path}</h4>
                  <span class="pill healthy">${artifact.kind}</span>
                </div>
                <p>${artifact.description}</p>
                <div class="meta">${artifact.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
                <div class="code">${artifact.sample}</div>
              </div>`
            )
            .join("")}
        </div>
      </article>
    </section>`
  );
}

export function renderExecutionLane() {
  const steps = executionLane();

  return pageShell(
    "Claude GTM Prompts - Execution Lane",
    "/execution-lane",
    `<section class="section-grid">
      <article class="card" style="grid-column: 1 / -1;">
        <div class="panel-title kicker">Execution Lane</div>
        <div class="list">
          ${steps
            .map(
              (step) => `<div class="item">
                <div class="item-head">
                  <div>
                    <h3>${step.name}</h3>
                    <p>${step.trigger}</p>
                  </div>
                  ${healthPill(step.health)}
                </div>
                <p><strong style="color:#dbeafe;">Output:</strong> ${step.output}</p>
                <p><strong style="color:#dbeafe;">Guardrail:</strong> ${step.guardrail}</p>
                <div class="meta"><span>SLA ${step.sla}</span></div>
              </div>`
            )
            .join("")}
        </div>
      </article>
    </section>`
  );
}

export function renderVerification() {
  return pageShell(
    "Claude GTM Prompts - Verification",
    "/verification",
    `<section class="section-grid">
      <article class="card" style="grid-column: 1 / -1;">
        <div class="panel-title kicker">Operator Verification</div>
        <div class="list">
          ${verification()
            .map(
              (line, index) => `<div class="item">
                <div class="item-head">
                  <h3>Verification ${index + 1}</h3>
                  <span class="pill healthy">pass</span>
                </div>
                <p>${line}</p>
              </div>`
            )
            .join("")}
        </div>
      </article>
    </section>`
  );
}

export function renderDocs() {
  return pageShell(
    "Claude GTM Prompts - Docs",
    "/docs",
    `<section class="section-grid docs">
      <article class="card" style="grid-column: span 8;">
        <div class="panel-title kicker">System Artifact / Principal Technical Spec</div>
        <h2 style="margin:0 0 16px;font-family:var(--serif);font-size:48px;">Prompt Operations For Web & GTM Systems</h2>
        <p>The <code>claude-gtm-prompts</code> repo models reusable prompt packs the same way an operator would treat playbooks, dashboards, or governance controls. Each pack is designed for a specific GTM motion, includes an owner, carries a score, and shows where human review should step in.</p>
        <div class="list">
          <div class="item">
            <h4>Primary purpose</h4>
            <p>Give growth, content, RevOps, and analytics teams a controlled library of prompts that can be reused, scored, and retired instead of reinvented in chat every week.</p>
          </div>
          <div class="item">
            <h4>Application shape mapping</h4>
            <p><code>src/app.ts</code> serves the operator shell. <code>src/data/samplePrompts.ts</code> models prompt packs and execution steps. <code>src/services/gtmPromptsService.ts</code> exposes API-ready payloads. <code>src/services/render.ts</code> renders the control-plane routes.</p>
          </div>
        </div>
      </article>
      <article class="card" style="grid-column: span 4;">
        <div class="panel-title kicker">Spec Classification</div>
        <p><strong style="color:#e7eefb;">Target platform</strong><br />Node.js Web Runtime (Express / Vite-free HTML diagnostics)</p>
        <p><strong style="color:#e7eefb;">Architecture role</strong><br />Director of Web & GTM Systems</p>
        <p><strong style="color:#e7eefb;">Signal metric target</strong><br /><span style="color:#34d399;font-family:var(--mono);">95% Conversion Coherence</span></p>
        <p><strong style="color:#e7eefb;">Active focus</strong><br />SEO briefs, CRO teardowns, ICP messaging, analytics narration, outbound refinement</p>
      </article>
    </section>`
  );
}

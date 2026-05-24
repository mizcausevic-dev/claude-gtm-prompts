export type PromptPack = {
  id: string;
  title: string;
  focus: string;
  owner: string;
  health: "healthy" | "watch" | "critical";
  score: number;
  output: string;
  channels: string[];
  promptPath: string;
  notes: string;
};

export type ExecutionStep = {
  name: string;
  trigger: string;
  output: string;
  guardrail: string;
  sla: string;
  health: "healthy" | "watch" | "critical";
};

export type PromptArtifact = {
  path: string;
  kind: string;
  description: string;
  tags: string[];
};

export const promptPacks: PromptPack[] = [
  {
    id: "SEO-01",
    title: "SEO opportunity brief",
    focus: "Turn a target keyword cluster into a concise brief with query intent, evidence gaps, and internal link asks.",
    owner: "Organic growth lead",
    health: "healthy",
    score: 94,
    output: "Brief with titles, FAQ angles, proof asks, and freshness constraints.",
    channels: ["SEO", "Editorial", "AEO"],
    promptPath: "prompts/seo/seo-opportunity-brief.md",
    notes: "Used when a content lane needs direction before the writer opens a doc."
  },
  {
    id: "CRO-02",
    title: "Landing page teardown",
    focus: "Audit hero clarity, offer sequencing, objections, and CTA friction on a B2B landing page.",
    owner: "Growth operator",
    health: "healthy",
    score: 92,
    output: "Prioritized teardown with conversion hypotheses and quick-win edits.",
    channels: ["CRO", "Paid", "Lifecycle"],
    promptPath: "prompts/cro/landing-page-teardown.md",
    notes: "Best for weekly conversion reviews after campaign traffic starts moving."
  },
  {
    id: "ICP-03",
    title: "ICP message matrix",
    focus: "Generate role-based messaging by segment, pain, proof, and objection.",
    owner: "RevOps strategist",
    health: "healthy",
    score: 90,
    output: "Table of personas, pains, claims, and CTA variants.",
    channels: ["Outbound", "ABM", "Sales enablement"],
    promptPath: "prompts/icp/icp-message-matrix.md",
    notes: "Useful when SDR motion and landing-page copy need the same core language."
  },
  {
    id: "AN-04",
    title: "Attribution insight explainer",
    focus: "Translate multi-touch attribution output into an exec-readable summary with channel implications.",
    owner: "Analytics lead",
    health: "watch",
    score: 88,
    output: "Narrative summary with channel winners, losers, and next experiment ideas.",
    channels: ["Analytics", "RevOps", "Leadership"],
    promptPath: "prompts/analytics/attribution-insight-explainer.md",
    notes: "Needs human review when source labeling or UTMs are inconsistent."
  },
  {
    id: "OUT-05",
    title: "Outbound sequence refiner",
    focus: "Tighten outbound emails for specificity, proof density, and meeting relevance.",
    owner: "Pipeline lead",
    health: "watch",
    score: 87,
    output: "Refined email sequence with subject lines, hooks, and CTA alternates.",
    channels: ["Outbound", "Lifecycle"],
    promptPath: "prompts/outbound/outbound-sequence-refiner.md",
    notes: "Best when paired with a hard ICP constraint and explicit negative examples."
  }
];

export const executionSteps: ExecutionStep[] = [
  {
    name: "Prompt intake",
    trigger: "New launch request, page refresh, campaign postmortem, or SDR ask.",
    output: "Prompt pack selection and operator context block.",
    guardrail: "Require audience, offer, and source-evidence inputs before running.",
    sla: "Same day",
    health: "healthy"
  },
  {
    name: "Draft generation",
    trigger: "Selected pack is executed with channel and KPI context.",
    output: "Structured draft with claims, assumptions, and next actions.",
    guardrail: "Force unknowns into an assumptions section instead of confident filler.",
    sla: "Within 30 minutes",
    health: "healthy"
  },
  {
    name: "Operator review",
    trigger: "High-impact copy or analytics narrative is ready for signoff.",
    output: "Approved revision or blocked revision with reasons.",
    guardrail: "Human review required for brand promises, pricing, metrics, or customer claims.",
    sla: "Within 1 business day",
    health: "watch"
  },
  {
    name: "Reuse and scoring",
    trigger: "Prompt has been used in production and results are available.",
    output: "Updated score, notes, and fit guidance inside the prompt library.",
    guardrail: "Do not keep low-performing prompts unscored after launch.",
    sla: "Weekly cadence",
    health: "watch"
  }
];

export const promptArtifacts: PromptArtifact[] = [
  {
    path: "prompts/seo/seo-opportunity-brief.md",
    kind: "Prompt pack",
    description: "Search brief generator with evidence gaps, entity asks, and FAQ hooks.",
    tags: ["SEO", "AEO", "Briefing"]
  },
  {
    path: "prompts/cro/landing-page-teardown.md",
    kind: "Prompt pack",
    description: "Conversion teardown pattern for B2B hero, CTA, proof, and objection sequencing.",
    tags: ["CRO", "Landing pages", "Paid"]
  },
  {
    path: "prompts/icp/icp-message-matrix.md",
    kind: "Prompt pack",
    description: "Persona-to-message alignment matrix for GTM and outbound teams.",
    tags: ["ICP", "ABM", "Messaging"]
  },
  {
    path: "docs/usage-playbook.md",
    kind: "Operator guide",
    description: "Rules for running prompt packs with context blocks, review notes, and scoring updates.",
    tags: ["Governance", "Operations"]
  }
];

export const fileSamples: Record<string, string> = {
  "prompts/seo/seo-opportunity-brief.md": `# SEO Opportunity Brief

You are a senior organic growth operator.
Goal: turn the supplied keyword cluster into a production-ready content brief.

Return:
1. primary intent
2. supporting questions
3. evidence gaps
4. internal links to request
5. freshness risks`,
  "prompts/cro/landing-page-teardown.md": `# Landing Page Teardown

Review the page for:
- hero clarity
- offer ladder sequencing
- CTA friction
- proof density
- objection handling

Return fixes in priority order with confidence labels.`,
  "prompts/icp/icp-message-matrix.md": `# ICP Message Matrix

Inputs:
- target segment
- job titles
- pain statements
- available proof

Return a table mapping each persona to:
- core tension
- best proof
- best CTA
- best anti-pattern to avoid`,
  "docs/usage-playbook.md": `# Usage Playbook

- Start every run with audience, offer, and source constraints.
- Require assumptions to be stated explicitly.
- Score every prompt after a real campaign, launch, or review cycle.
- Archive packs that drift from production language.`
};

# Claude GTM Prompts Architecture

`claude-gtm-prompts` models prompt operations as a GTM control surface rather than a generic prompt dump. It turns reusable prompt packs, execution steps, artifact samples, and scoring posture into one operator-facing system.

## Core surfaces

- `src/app.ts`
  - Express application that serves both HTML routes and JSON payloads.
- `src/data/samplePrompts.ts`
  - Prompt packs, execution steps, artifact references, and sample prompt text.
- `src/services/gtmPromptsService.ts`
  - Summary metrics and API-ready projections over the modeled prompt data.
- `src/services/render.ts`
  - Operator shell and the route-specific HTML views.

## Route model

- `/`
  - overview metrics and top prompt-pack snapshot
- `/prompt-library`
  - prompt catalog plus artifact samples
- `/execution-lane`
  - intake, run, review, and scoring workflow
- `/verification`
  - operator validation statements
- `/docs`
  - architecture framing and role classification

## Design goal

The repo is designed to show that AI-assisted GTM work needs:

- reusable prompt assets
- role ownership
- scoring and revision loops
- explicit human review boundaries

That makes the prompt layer feel like operating infrastructure rather than disposable chat output.

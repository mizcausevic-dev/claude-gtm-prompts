import express from "express";

import { artifacts, executionLane, payload, promptLibrary, summary, verification } from "./services/gtmPromptsService";
import { renderDocs, renderExecutionLane, renderOverview, renderPromptLibrary, renderVerification } from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5454);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/prompt-library", (_req, res) => res.type("html").send(renderPromptLibrary()));
app.get("/execution-lane", (_req, res) => res.type("html").send(renderExecutionLane()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/prompt-library", (_req, res) => res.json(promptLibrary()));
app.get("/api/execution-lane", (_req, res) => res.json(executionLane()));
app.get("/api/prompt-artifacts", (_req, res) => res.json(artifacts()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Claude GTM Prompts listening on http://127.0.0.1:${port}`);
  });
}

export default app;

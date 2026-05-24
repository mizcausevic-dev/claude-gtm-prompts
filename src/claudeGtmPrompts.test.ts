import { describe, expect, it } from "vitest";

import { artifacts, executionLane, payload, promptLibrary, summary } from "./services/gtmPromptsService";

describe("claude-gtm-prompts", () => {
  it("summary exposes prompt coverage and execution posture", () => {
    const result = summary();

    expect(result.promptCount).toBeGreaterThanOrEqual(5);
    expect(result.artifactCount).toBeGreaterThanOrEqual(3);
    expect(result.recommendation).toContain("versioned prompt");
  });

  it("prompt library and execution lane stay GTM-specific", () => {
    expect(promptLibrary().some((item) => item.title.toLowerCase().includes("seo"))).toBe(true);
    expect(executionLane().some((item) => item.trigger.toLowerCase().includes("launch"))).toBe(true);
    expect(artifacts().some((artifact) => artifact.path.includes("prompts"))).toBe(true);
  });

  it("payload bundles the full prompt operating surface", () => {
    const result = payload();

    expect(result.dashboard.promptCount).toBe(result.promptLibrary.length);
    expect(result.executionLane.length).toBeGreaterThan(0);
    expect(result.artifacts.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});

import { executionSteps, fileSamples, promptArtifacts, promptPacks } from "../data/samplePrompts";

export function summary() {
  const healthy = promptPacks.filter((item) => item.health === "healthy").length;
  const attention = promptPacks.filter((item) => item.health !== "healthy").length;
  const averageScore = Math.round(promptPacks.reduce((sum, item) => sum + item.score, 0) / promptPacks.length);

  return {
    promptCount: promptPacks.length,
    healthy,
    attention,
    executionCount: executionSteps.length,
    artifactCount: promptArtifacts.length,
    averageScore,
    recommendation:
      "Treat every high-leverage GTM prompt as a versioned prompt asset, because prompt drift can quietly distort pipeline messaging, analytics interpretation, and launch quality."
  };
}

export function promptLibrary() {
  return promptPacks;
}

export function executionLane() {
  return executionSteps;
}

export function artifacts() {
  return promptArtifacts.map((artifact) => ({
    ...artifact,
    sample: fileSamples[artifact.path]
  }));
}

export function verification() {
  return [
    "The repo treats GTM prompts as operating assets with owners, scores, and review posture rather than chat fragments.",
    "Prompt packs cover acquisition, conversion, analytics, and outbound use cases without pretending that model output can skip human review.",
    "The execution lane makes it clear when a prompt should be rerun, revised, approved, or retired."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    promptLibrary: promptLibrary(),
    executionLane: executionLane(),
    artifacts: artifacts(),
    verification: verification()
  };
}

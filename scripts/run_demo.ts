import { executionLane, summary } from "../src/services/gtmPromptsService";

console.log("claude-gtm-prompts demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(executionLane(), null, 2));

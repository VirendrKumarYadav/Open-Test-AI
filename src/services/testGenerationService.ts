import { TestCaseAgent } from "../agents/testCaseAgent.js";
import { AutomationAgent } from "../agents/automationAgent.js";
import fs from "node:fs/promises";
import path from "node:path";

type GeneratedResult = {
  testCases: unknown[];
  automationPlan: {
    framework: string;
    language: string;
    steps: string[];
  };
};

export class TestGenerationService {

  private agent = new TestCaseAgent();
  private automationAgent = new AutomationAgent();

  async generate(requirement: string) {

    if (!requirement || requirement.trim().length === 0) {
      throw new Error("Requirement is required");
    }

    const result = await this.agent.generate(requirement) as GeneratedResult;

    if (
      !Array.isArray(result.testCases) ||
      !result.automationPlan ||
      typeof result.automationPlan.framework !== "string"
    ) {
      throw new Error("LLM returned an incomplete test automation result");
    }

    const slug = requirement
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0,  sixtyCharacters);
    const outputDirectory = path.resolve("generated");
    const testsDirectory = path.resolve("tests");
    const baseName = slug || "generated-test";

    await fs.mkdir(outputDirectory, { recursive: true });
    await fs.mkdir(testsDirectory, { recursive: true });
    const testCasesJson = JSON.stringify(result, null, 2);
    await fs.writeFile(
      path.join(outputDirectory, `${baseName}.json`),
      `${testCasesJson}\n`,
      "utf8"
    );
    const playwrightScript = await this.automationAgent.generate(testCasesJson);
    await fs.writeFile(
      path.join(testsDirectory, `${baseName}.spec.ts`),
      `${playwrightScript.trim()}\n`,
      "utf8"
    );

    return {
      ...result,
      playwrightScript,
      artifacts: {
        json: `generated/${baseName}.json`,
        playwrightScript: `tests/${baseName}.spec.ts`
      }
    };
  }
}

const sixtyCharacters = 60;
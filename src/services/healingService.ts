import fs from "node:fs/promises";
import path from "node:path";
import { HealerAgent, HealingResult } from "../agents/healerAgent.js";

export class HealingService {
  private agent = new HealerAgent();

  async heal(
    script: string,
    failure: string,
    context = ""
  ): Promise<HealingResult & { artifact: string }> {
    if (!script.trim()) throw new Error("Test script is required");
    if (!failure.trim()) throw new Error("Failure details are required");

    const result = await this.agent.heal(script, failure, context);
    const testsDirectory = path.resolve("tests");
    await fs.mkdir(testsDirectory, { recursive: true });
    const artifact = "tests/healed-test.spec.ts";
    await fs.writeFile(
      path.join(testsDirectory, "healed-test.spec.ts"),
      `${result.fixedScript.trim()}\n`,
      "utf8"
    );

    return { ...result, artifact };
  }
}

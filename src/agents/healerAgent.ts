import { OllamaClient } from "../llm/ollamaClient.js";
import { healingPrompt } from "../llm/healingPrompts.js";

export type HealingResult = {
  fixedScript: string;
  changes: string[];
  confidence: string;
};

export class HealerAgent {
  private ollama = new OllamaClient();

  async heal(script: string, failure: string, context = ""): Promise<HealingResult> {
    const response = await this.ollama.chat(
      await healingPrompt(script, failure, context)
    );

    let result: HealingResult;
    try {
      result = JSON.parse(response) as HealingResult;
    } catch {
      const jsonStart = response.indexOf("{");
      const jsonEnd = response.lastIndexOf("}");
      if (jsonStart < 0 || jsonEnd <= jsonStart) {
        throw new Error("LLM returned invalid healing JSON");
      }
      try {
        result = JSON.parse(response.slice(jsonStart, jsonEnd + 1)) as HealingResult;
      } catch {
        throw new Error("LLM returned invalid healing JSON");
      }
    }

    if (
      typeof result.fixedScript !== "string" ||
      !Array.isArray(result.changes) ||
      typeof result.confidence !== "string"
    ) {
      throw new Error("LLM returned an incomplete healing result");
    }

    return result;
  }
}

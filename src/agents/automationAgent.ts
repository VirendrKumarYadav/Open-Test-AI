import { OllamaClient } from "../llm/ollamaClient.js";
import { automationPrompt } from "../llm/automationPrompts.js";

export class AutomationAgent {
  private ollama = new OllamaClient();

  async generate(testCasesJson: string): Promise<string> {
    const response = await this.ollama.chat(await automationPrompt(testCasesJson));
    let parsed: { playwrightScript?: unknown };

    try {
      parsed = JSON.parse(response) as { playwrightScript?: unknown };
    } catch {
      const start = response.indexOf("{");
      const end = response.lastIndexOf("}");
      if (start < 0 || end <= start) {
        throw new Error("LLM returned invalid automation JSON");
      }
      try {
        parsed = JSON.parse(response.slice(start, end + 1)) as {
          playwrightScript?: unknown;
        };
      } catch {
        throw new Error("LLM returned invalid automation JSON");
      }
    }

    if (typeof parsed.playwrightScript !== "string") {
      throw new Error("LLM returned an incomplete automation result");
    }

    return parsed.playwrightScript;
  }
}

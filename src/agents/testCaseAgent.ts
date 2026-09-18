import { OllamaClient } from "../llm/ollamaClient.js";
import { testCasePrompt } from "../llm/prompts.js";

export class TestCaseAgent {

  private ollama = new OllamaClient();

  async generate(requirement: string, generationToken: string) {

    const prompt = await testCasePrompt(requirement, generationToken);

    const response = await this.ollama.chat(prompt);

    try {
      return JSON.parse(response);
    } catch {
      const jsonStart = response.indexOf("{");
      const jsonEnd = response.lastIndexOf("}");

      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        try {
          return JSON.parse(response.slice(jsonStart, jsonEnd + 1));
        } catch {
          // Fall through to the actionable error below.
        }
      }

      throw new Error("LLM returned invalid JSON");
    }
  }
}
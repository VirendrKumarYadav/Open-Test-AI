import fs from "node:fs/promises";
import path from "node:path";

const promptTemplatePath = path.resolve("test-generation-prompt.md");

export async function testCasePrompt(
  requirement: string,
  generationToken: string
): Promise<string> {
  const template = await fs.readFile(promptTemplatePath, "utf8");
  return template
    .replace("{{REQUIREMENT}}", requirement)
    .replace(
      "{{GENERATION_TOKEN}}",
      generationToken
    );
}
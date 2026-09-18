import fs from "node:fs/promises";
import path from "node:path";

const promptTemplatePath = path.resolve("healing-prompt.md");

export async function healingPrompt(
  script: string,
  failure: string,
  context = ""
): Promise<string> {
  const template = await fs.readFile(promptTemplatePath, "utf8");

  return template
    .replace("{{SCRIPT}}", script)
    .replace("{{FAILURE}}", failure)
    .replace("{{CONTEXT}}", context);
}

import fs from "node:fs/promises";
import path from "node:path";

const promptTemplatePath = path.resolve("automation-prompt.md");

export async function automationPrompt(testCasesJson: string): Promise<string> {
  const template = await fs.readFile(promptTemplatePath, "utf8");
  return template.replace("{{TEST_CASE_JSON}}", testCasesJson);
}

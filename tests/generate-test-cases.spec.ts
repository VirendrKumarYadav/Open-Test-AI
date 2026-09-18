import { expect, test } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const requirement =
  "User should be able to search flights from Delhi to Mumbai for a selected departure date";

const scenarioDetails = {
  requirement,
  scenario: "Flight search",
  userRole: "Registered traveller",
  priority: "High",
  platform: "Web",
  details:
    "The departure date is required and must not be in the past. Show a clear message when no flights are available."
};

async function saveGeneratedTestCases(data: unknown): Promise<string> {
  const outputDirectory = path.resolve("generated");
  const outputFile = path.join(outputDirectory, "flight-search-test-cases.json");

  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.writeFile(outputFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return outputFile;
}

test("generates and saves test cases through the API", async ({ request }) => {
  const response = await request.post("/api/ai/generate-tests", {
    data: { requirement }
  });

  expect(response.ok()).toBeTruthy();
  const payload = await response.json();
  expect(payload.success).toBe(true);
  expect(payload.data.testCases).toBeInstanceOf(Array);
  expect(payload.data.testCases.length).toBeGreaterThan(0);
  expect(payload.data.automationPlan.framework).toBe("Playwright");
  expect(payload.data.playwrightScript).toContain("@playwright/test");
  expect(payload.data.artifacts.playwrightScript).toMatch(/^tests\/.+\.spec\.ts$/);

  await saveGeneratedTestCases(payload.data);
});

test("completes the test-case generation flow through the UI", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Requirement *").fill(scenarioDetails.requirement);
  await page.getByLabel("Scenario / feature name").fill(scenarioDetails.scenario);
  await page.getByLabel("User role").fill(scenarioDetails.userRole);
  await page.getByLabel("Priority").selectOption({ label: scenarioDetails.priority });
  await page.getByLabel("Platform / environment").fill(scenarioDetails.platform);
  await page
    .getByLabel("Additional details and acceptance criteria")
    .fill(scenarioDetails.details);

  await page.getByRole("button", { name: /Generate test cases/ }).click();
  await expect(page.getByRole("status")).toHaveText("Test cases generated successfully.", {
    timeout: 120_000
  });

  const generatedJson = await page.locator("#results").textContent();
  expect(generatedJson).toBeTruthy();
  const parsedResult = JSON.parse(generatedJson ?? "");
  expect(parsedResult.testCases).toBeInstanceOf(Array);
  expect(parsedResult.testCases.length).toBeGreaterThan(0);
  expect(parsedResult.automationPlan.framework).toBe("Playwright");
  expect(parsedResult.playwrightScript).toContain("@playwright/test");
  expect(parsedResult.artifacts.playwrightScript).toMatch(/^tests\/.+\.spec\.ts$/);

  await saveGeneratedTestCases(parsedResult);
});

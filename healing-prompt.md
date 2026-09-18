# OpenTestAI Playwright healing instructions

You are a senior Playwright automation engineer.

Repair the failing test script using the failure information below.

<test-script>
{{SCRIPT}}
</test-script>

<failure>
{{FAILURE}}
</failure>

<context>
{{CONTEXT}}
</context>

Return only one valid JSON object with this exact shape:

{
  "fixedScript": "complete corrected TypeScript Playwright test source",
  "changes": ["Describe each correction"],
  "confidence": "high"
}

The `fixedScript` must remain executable TypeScript, import from
`@playwright/test`, preserve the original test intent, and use robust accessible
locators and assertions. Do not return Markdown fences or explanatory text.

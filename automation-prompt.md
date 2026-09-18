# OpenTestAI Playwright script generation instructions

You are a senior Playwright automation engineer.

Generate a complete executable TypeScript Playwright test script from the
persisted test-case JSON below.

<test-case-json>
{{TEST_CASE_JSON}}
</test-case-json>

Target application URL: https://www.ixigo.com/

The script must import `test` and `expect` from `@playwright/test`, contain one
or more `test()` blocks, and implement every scenario in `testCases`. Use the
steps and expected results from the JSON. Use robust accessible locators when
the application selectors are not specified. Do not put the script in Markdown
code fences.

Return only one valid JSON object:

{
  "playwrightScript": "complete TypeScript Playwright test source"
}

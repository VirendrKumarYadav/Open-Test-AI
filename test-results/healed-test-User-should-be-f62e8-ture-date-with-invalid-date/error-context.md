# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: healed-test.spec.ts >> User should be able to search flights from Delhi to Mumbai for a selected departure date with invalid date
- Location: tests/healed-test.spec.ts:20:5

# Error details

```
Error: locator.type: Target page, context or browser has been closed
Call log:
  - waiting for locator('#departure-city-input')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('User should be able to search flights from Delhi to Mumbai for a selected departure date', async ({ page }) => {
  4  |   await page.goto('https://www.ixigo.com/');
  5  |   await page.locator('#departure-city-input')?.type('Delhi'); // Using robust locator
  6  |   await page.locator('#arrival-city-input')?.type('Mumbai'); // Using robust locator
  7  |   await page.locator('#departure-date-input')?.selectOption('2024-03-15'); // Using robust locator
  8  |   await page.click('#search-flights-button');
  9  |   await expect(page.locator('text=Flight Details')).toHaveText('Flight Details');
  10 | });
  11 | 
  12 | test('User should be able to search flights from Delhi to Mumbai for a selected departure date with no date selected', async ({ page }) => {
  13 |   await page.goto('https://www.ixigo.com/');
  14 |   await page.locator('#departure-city-input')?.type('Delhi'); // Using robust locator
  15 |   await page.locator('#arrival-city-input')?.type('Mumbai'); // Using robust locator
  16 |   await page.click('#search-flights-button');
  17 |   await expect(page.locator('text=Error: Please select a departure date')).toHaveText('Error: Please select a departure date');
  18 | });
  19 | 
  20 | test('User should be able to search flights from Delhi to Mumbai for a selected departure date with invalid date', async ({ page }) => {
  21 |   await page.goto('https://www.ixigo.com/');
> 22 |   await page.locator('#departure-city-input')?.type('Delhi'); // Using robust locator
     |                                                ^ Error: locator.type: Target page, context or browser has been closed
  23 |   await page.locator('#arrival-city-input')?.type('Mumbai'); // Using robust locator
  24 |   await page.locator('#departure-date-input')?.selectOption('2024-13-15'); // Invalid date
  25 |   await page.click('#search-flights-button');
  26 |   await expect(page.locator('text=Error: Invalid date')).toHaveText('Error: Invalid date');
  27 | });
  28 | 
  29 | test('User should be able to search flights from Delhi to Mumbai for a selected departure date with invalid city', async ({ page }) => {
  30 |   await page.goto('https://www.ixigo.com/');
  31 |   await page.locator('#departure-city-input')?.type('Chennai'); // Invalid city
  32 |   await page.locator('#arrival-city-input')?.type('Mumbai'); // Using robust locator
  33 |   await page.locator('#departure-date-input')?.selectOption('2024-03-15'); // Using robust locator
  34 |   await page.click('#search-flights-button');
  35 |   await expect(page.locator('text=Error: Invalid city')).toHaveText('Error: Invalid city');
  36 | });
  37 | 
```
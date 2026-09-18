import { test, expect } from '@playwright/test';

test('User should be able to search flights from Delhi to Mumbai for a selected departure date', async ({ page }) => {
  await page.goto('https://www.ixigo.com/');
  await page.locator('#departure-city-input')?.type('Delhi'); // Using robust locator
  await page.locator('#arrival-city-input')?.type('Mumbai'); // Using robust locator
  await page.locator('#departure-date-input')?.selectOption('2024-03-15'); // Using robust locator
  await page.click('#search-flights-button');
  await expect(page.locator('text=Flight Details')).toHaveText('Flight Details');
});

test('User should be able to search flights from Delhi to Mumbai for a selected departure date with no date selected', async ({ page }) => {
  await page.goto('https://www.ixigo.com/');
  await page.locator('#departure-city-input')?.type('Delhi'); // Using robust locator
  await page.locator('#arrival-city-input')?.type('Mumbai'); // Using robust locator
  await page.click('#search-flights-button');
  await expect(page.locator('text=Error: Please select a departure date')).toHaveText('Error: Please select a departure date');
});

test('User should be able to search flights from Delhi to Mumbai for a selected departure date with invalid date', async ({ page }) => {
  await page.goto('https://www.ixigo.com/');
  await page.locator('#departure-city-input')?.type('Delhi'); // Using robust locator
  await page.locator('#arrival-city-input')?.type('Mumbai'); // Using robust locator
  await page.locator('#departure-date-input')?.selectOption('2024-13-15'); // Invalid date
  await page.click('#search-flights-button');
  await expect(page.locator('text=Error: Invalid date')).toHaveText('Error: Invalid date');
});

test('User should be able to search flights from Delhi to Mumbai for a selected departure date with invalid city', async ({ page }) => {
  await page.goto('https://www.ixigo.com/');
  await page.locator('#departure-city-input')?.type('Chennai'); // Invalid city
  await page.locator('#arrival-city-input')?.type('Mumbai'); // Using robust locator
  await page.locator('#departure-date-input')?.selectOption('2024-03-15'); // Using robust locator
  await page.click('#search-flights-button');
  await expect(page.locator('text=Error: Invalid city')).toHaveText('Error: Invalid city');
});

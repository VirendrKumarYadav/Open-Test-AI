const test = require('@playwright/test');

const url = 'https://www.ixigo.com/';

test('Search flights from Delhi to Mumbai for a selected departure date', async ({ page }) => {
  await page.goto(url);

  await page.selectOption('#select-flight', 'Delhi (DEL) to Mumbai (BOM)');
  await page.type('#departure-date', '2022-01-01');
  await page.click('#search-btn');

  await page expect.toHaveText('Search results displayed for the selected departure date');

  await page expect.toNotHaveText('Error message displayed for the selected departure date');

  await page expect.toHaveText('No search results displayed');

  await page expect.toNotHaveText('Error message displayed for no search results');

  await page expect.toHaveText('Invalid departure date');

  await page expect.toNotHaveText('Error message displayed for invalid departure date');

  await page expect.toHaveText('Invalid departure date format');

  await page expect.toNotHaveText('Error message displayed for invalid departure date format');

  await page expect.toHaveText('Blank departure date');

  await page expect.toNotHaveText('Error message displayed for blank departure date');

  await page expect.toNotHaveText('Search results displayed for the selected departure date');

});

test('Invalid departure date', async ({ page }) => {
  await page.goto(url);

  await page.selectOption('#select-flight', 'Delhi (DEL) to Mumbai (BOM)');
  await page.type('#departure-date', '2023-13-01');
  await page.click('#search-btn');

  await page expect.toHaveText('Error message displayed for invalid departure date');

  await page expect.toNotHaveText('Search results displayed for the selected departure date');

  await page expect.toHaveText('No search results displayed');

  await page expect.toNotHaveText('Error message displayed for no search results');

  await page expect.toHaveText('Invalid departure date format');

  await page expect.toNotHaveText('Error message displayed for invalid departure date format');

  await page expect.toHaveText('Blank departure date');

  await page expect.toNotHaveText('Error message displayed for blank departure date');

  await page expect.toNotHaveText('Search results displayed for the selected departure date');

});

test('No flights available on selected departure date', async ({ page }) => {
  await page.goto(url);

  await page.selectOption('#select-flight', 'Delhi (DEL) to Mumbai (BOM)');
  await page.type('#departure-date', '2022-01-01');
  await page.click('#search-btn');

  await page expect.toHaveText('No search results displayed');

  await page expect.toNotHaveText('Search results displayed for the selected departure date');

  await page expect.toHaveText('Error message displayed for the selected departure date');

  await page expect.toNotHaveText('Invalid departure date');

  await page expect.toNotHaveText('Invalid departure date format');

  await page expect.toNotHaveText('Blank departure date');

  await page expect.toNotHaveText('Error message displayed for blank departure date');

  await page expect.toNotHaveText('Error message displayed for invalid departure date');

  await page expect.toNotHaveText('Search results displayed for the selected departure date');

});

test('Invalid departure date format', async ({ page }) => {
  await page.goto(url);

  await page.selectOption('#select-flight', 'Delhi (DEL) to Mumbai (BOM)');
  await page.type('#departure-date', '2022-13-01');
  await page.click('#search-btn');

  await page expect.toHaveText('Error message displayed for invalid departure date format');

  await page expect.toNotHaveText('Search results displayed for the selected departure date');

  await page expect.toHaveText('No search results displayed');

  await page expect.toNotHaveText('Error message displayed for no search results');

  await page expect.toHaveText('Invalid departure date');

  await page expect.toNotHaveText('Blank departure date');

  await page expect.toNotHaveText('Error message displayed for blank departure date');

  await page expect.toNotHaveText('Error message displayed for invalid departure date');

  await page expect.toNotHaveText('Search results displayed for the selected departure date');

});

test('Blank departure date', async ({ page }) => {
  await page.goto(url);

  await page.selectOption('#select-flight', 'Delhi (DEL) to Mumbai (BOM)');
  await page.type('#departure-date', '');
  await page.click('#search-btn');

  await page expect.toHaveText('Error message displayed for blank departure date');

  await page expect.toNotHaveText('Search results displayed for the selected departure date');

  await page expect.toHaveText('No search results displayed');

  await page expect.toNotHaveText('Error message displayed for no search results');

  await page expect.toHaveText('Invalid departure date');

  await page expect.toNotHaveText('Invalid departure date format');

  await page expect.toNotHaveText('Blank departure date');

  await page expect.toNotHaveText('Error message displayed for invalid departure date');

  await page expect.toNotHaveText('Search results displayed for the selected departure date');

});

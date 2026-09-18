import { test, expect } from '@playwright/test';

const testCases = [
  {
    id: 'TC001',
    title: 'Book Movie Ticket',
    type: 'positive',
    priority: 'medium',
    steps: [
      '1. Open BookMyShow website',
      '2. Click on Movies tab',
      '3. Select any movie',
      '4. Select showtime 2pm tomorrow',
      '5. Click on Book Now button'
    ],
    expectedResult: 'Movie ticket booked successfully'
  },
  {
    id: 'TC002',
    title: 'Invalid Movie',
    type: 'negative',
    priority: 'low',
    steps: [
      '1. Open BookMyShow website',
      '2. Click on Movies tab',
      '3. Search for a non-existent movie',
      '4. Select showtime 2pm tomorrow',
      '5. Click on Book Now button'
    ],
    expectedResult: 'Error message for non-existent movie'
  },
  {
    id: 'TC003',
    title: 'Invalid Showtime',
    type: 'negative',
    priority: 'low',
    steps: [
      '1. Open BookMyShow website',
      '2. Click on Movies tab',
      '3. Select a movie',
      '4. Search for a showtime that does not exist',
      '5. Click on Book Now button'
    ],
    expectedResult: 'Error message for invalid showtime'
  },
  {
    id: 'TC004',
    title: 'Invalid Date',
    type: 'negative',
    priority: 'low',
    steps: [
      '1. Open BookMyShow website',
      '2. Click on Movies tab',
      '3. Select a movie',
      '4. Select a showtime with an invalid date',
      '5. Click on Book Now button'
    ],
    expectedResult: 'Error message for invalid date'
  },
  {
    id: 'TC005',
    title: 'User Session Expired',
    type: 'negative',
    priority: 'medium',
    steps: [
      '1. Open BookMyShow website',
      '2. Close browser session',
      '3. Try to book movie ticket again',
      '4. Click on Book Now button'
    ],
    expectedResult: 'Error message for user session expired'
  }
]

testCases.forEach((testCase) => {
  test(`Test Case: ${testCase.title}`, async ({ page }) => {
    await page.goto('https://www.ixigo.com/');

    // TC001: Book Movie Ticket
    if (testCase.type === 'positive') {
      await page.locator('text=Movies').click();
      await page.locator('text=Movie').selectOption('#movieSelect', testCase.steps[2]);
      await page.locator('text=Showtime').selectOption('#showtimeSelect', testCase.steps[3]);
      await page.locator('text=Book Now').click();
      const expectedResultMessage = await page.locator('text', testCase.expectedResult).textContent();
      expect(expectedResultMessage).toBe(testCase.expectedResult);
    }

    // TC002: Invalid Movie
    else if (testCase.type === 'negative') {
      await page.locator('text=Movies').click();
      await page.locator('text=Movie').selectOption('#movieSelect', testCase.steps[3]);
      await page.locator('text=Showtime').selectOption('#showtimeSelect', testCase.steps[3]);
      await page.locator('text=Book Now').click();
      const expectedResultMessage = await page.locator('text', testCase.expectedResult).textContent();
      expect(expectedResultMessage).toBe(testCase.expectedResult);
    }

    // TC003: Invalid Showtime
    else if (testCase.type === 'negative') {
      await page.locator('text=Movies').click();
      await page.locator('text=Movie').selectOption('#movieSelect', testCase.steps[2]);
      await page.locator('text=Showtime').selectOption('#showtimeSelect', testCase.steps[4]);
      await page.locator('text=Book Now').click();
      const expectedResultMessage = await page.locator('text', testCase.expectedResult).textContent();
      expect(expectedResultMessage).toBe(testCase.expectedResult);
    }

    // TC004: Invalid Date
    else if (testCase.type === 'negative') {
      await page.locator('text=Movies').click();
      await page.locator('text=Movie').selectOption('#movieSelect', testCase.steps[2]);
      await page.locator('text=Showtime').selectOption('#showtimeSelect', testCase.steps[4]);
      await page.locator('text=Book Now').click();
      const expectedResultMessage = await page.locator('text', testCase.expectedResult).textContent();
      expect(expectedResultMessage).toBe(testCase.expectedResult);
    }

    // TC005: User Session Expired
    else if (testCase.type === 'negative') {
      await page.goto('https://www.ixigo.com/');
      await page.locator('text=BookMyShow').click();
      await page.locator('text=Login').click();
      await page.locator('text=Logout').click();
      await page.locator('text=Login').click();
      await page.locator('text=Book My Show').click();
      await page.locator('text=Movie').selectOption('#movieSelect', testCase.steps[2]);
      await page.locator('text=Showtime').selectOption('#showtimeSelect', testCase.steps[3]);
      await page.locator('text=Book Now').click();
      const expectedResultMessage = await page.locator('text', testCase.expectedResult).textContent();
      expect(expectedResultMessage).toBe(testCase.expectedResult);
    }
  });
});

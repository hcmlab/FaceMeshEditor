import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h2')).toHaveText('Face Mesh Editor');
});

test('Check Element Relative Width to Container', async ({ page }) => {
  await page.goto('/');

  const containerHandle = page.locator('#app');
  const sidebar = page.locator('#sidebar');
  const canvas = page.locator('#canvas-div');
  const thumbnails = page.locator('#thumbnail-gallery');

  const containerBox = await containerHandle.boundingBox();
  expect(containerBox).not.toBe(null);
  const sidebarBox = await sidebar.boundingBox();
  expect(sidebarBox).not.toBe(null);
  const canvasBox = await canvas.boundingBox();
  expect(canvasBox).not.toBe(null);
  const thumbnailsBox = await thumbnails.boundingBox();
  expect(thumbnailsBox).not.toBe(null);

  // eslint-disable-next-line playwright/no-conditional-in-test
  if (!containerBox) return;
  // eslint-disable-next-line playwright/no-conditional-in-test
  if (!sidebarBox) return;
  // eslint-disable-next-line playwright/no-conditional-in-test
  if (!canvasBox) return;
  // eslint-disable-next-line playwright/no-conditional-in-test
  if (!thumbnailsBox) return;

  let relativeWidth = sidebarBox.width / containerBox.width;
  expect(relativeWidth).toBeCloseTo(0.2, 1);

  relativeWidth = canvasBox.width / containerBox.width;
  expect(relativeWidth).toBeCloseTo(0.7, 1);

  relativeWidth = thumbnailsBox.width / containerBox.width;
  expect(relativeWidth).toBeCloseTo(0.1, 1);
});

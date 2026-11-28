import { expect, test } from '@playwright/test';

test('Front reads the public project brand', async ({ page }) => {
	await page.route('**/apiopen/project', async (route) => {
		expect(route.request().headers()['authorization']).toBeUndefined();
		await route.fulfill({ json: { data: { name: 'Choralys Démo' } } });
	});
	await page.goto('/');
	await expect(page).toHaveTitle('Choralys Démo');
});

test('Front falls back when the public brand is unavailable', async ({ page }) => {
	await page.route('**/apiopen/project', (route) => route.fulfill({ status: 503 }));
	await page.goto('/');
	await expect(page).toHaveTitle('SymSvel');
});

test('front standalone build does not call the optional GDPR API', async ({ page }) => {
	let privacyRequests = 0;
	await page.route('**/apiopen/gdpr/**', (route) => {
		privacyRequests++;
		return route.fulfill({ status: 503 });
	});
	await page.route('**/apiopen/project', (route) =>
		route.fulfill({ json: { data: { name: 'Standalone' } } })
	);
	await page.goto('/');
	await expect(page).toHaveTitle('Standalone');
	expect(privacyRequests).toBe(0);
});

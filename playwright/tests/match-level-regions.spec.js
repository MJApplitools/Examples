import { test } from '@playwright/test';
import {
    Eyes,
    Target
} from '@applitools/eyes-playwright';

test.describe('ACME Bank', () => {
    let eyes;
    test.beforeEach(async ({ page }) => {
        eyes = new Eyes();
        await eyes.open(page, 'ACME Bank', 'Bank - Match Level Regions', { width: 1200, height: 1000 });
    });

    test('Test Bank App', async ({ page }) => {
        await page.goto('https://sandbox.applitools.com/bank/dashboard?layoutAlgo=true');
        await eyes.check(
            Target.window()
                .layoutRegions('.dashboardOverview_accountBalances__3TUPB', '.dashboardTable_dbTable___R5Du')
        );
    });
        
    test.afterEach(async () => {
        await eyes.close();
    });
});
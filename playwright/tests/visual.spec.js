import { test } from '@playwright/test';
import {
    Eyes,
    Target
} from '@applitools/eyes-playwright';

test.describe('ACME Bank', () => {
    let eyes;
    test.beforeEach(async ({ page }) => {
        eyes = new Eyes();
        await eyes.open(page, 'ACME Bank', test.info().title, { width: 1200, height: 1000 });
    });

    test('log into a bank account', async ({ page }) => {
        await page.goto('https://sandbox.applitools.com/bank?validateForm=true');

        /* FUNCTIONAL ASSERTIONS With VISUAL AI */
        const usernameLocator = await page.locator('#username');
        const passwordLocator = page.locator('#password')
        const submitLocator = page.locator('.loginForm_formSubmit__WwZ_T')

        // Assert Failure - missing username & pass
        await submitLocator.click();
        await eyes.check(Target.window().withName('Missing username and password'));

        // Assert Failure - missing password
        await usernameLocator.type('user');
        await submitLocator.click();
        await eyes.check(Target.window().withName('Missing password'));

        // Assert Failure - missing username
        await usernameLocator.clear();
        await passwordLocator.type('password');
        await submitLocator.click();
        await eyes.check(Target.window().withName('Missing username'));

        // Assert successful login
        await usernameLocator.type('user');
        await submitLocator.click();
        await eyes.check(Target.window().withName('Successful login'));
    });
        
    test.afterEach(async () => {
        await eyes.close();
    });
});
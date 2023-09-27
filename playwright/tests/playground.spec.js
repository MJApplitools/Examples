import { test } from '@playwright/test';
import {
    Eyes,
    Target,
    VisualGridRunner,
    Configuration
} from '@applitools/eyes-playwright';

test.describe('ACME Bank', () => {
    let eyes;
    let runner;
    let Config = new Configuration();
    test.beforeEach(async ({ page }) => {
        runner = new VisualGridRunner({ testConcurrency: 5 });
        eyes = new Eyes(runner, Config);
        await eyes.open(page, 'Playground', test.info().title, { width: 1200, height: 1000 });
    });

    test('log into a bank account', async ({ page }) => {
        await page.goto('https://www.sonos.com/en-us/home');
        await eyes.check(Target.window().fully());
    });
        
    test.afterEach(async () => {
        await eyes.close();
    });

    test.afterAll(async() => {

        const results = await runner.getAllTestResults();
        console.log('Visual test results', results);
      });
});
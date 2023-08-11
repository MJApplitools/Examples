import { test } from '@playwright/test';
import {
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
} from '@applitools/eyes-playwright';

export const USE_ULTRAFAST_GRID = false;

export let Batch;
export let Config;
export let Runner;

test.beforeAll(async() => {
    if (USE_ULTRAFAST_GRID) {
        Runner = new VisualGridRunner({ testConcurrency: 5 });
    }
    else {
        Runner = new ClassicRunner();
    }
    
    Batch = new BatchInfo({name: `Playwright Best Practices`});
    Config = new Configuration();
    Config.setBatch(Batch);

    if (USE_ULTRAFAST_GRID) {
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    }
});

test.describe('ACME Bank', () => {
    let eyes;
    test.beforeEach(async ({ page }) => {
        
        eyes = new Eyes(Runner, Config);
        
        await eyes.open(
            page,
            'ACME Bank',
            test.info().title,
            { width: 1200, height: 1000 });
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
    
    test.afterAll(async() => {
        const results = await Runner.getAllTestResults();
        console.log('Visual test results', results);
    });
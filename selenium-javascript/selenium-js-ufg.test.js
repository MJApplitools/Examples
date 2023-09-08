// @applitools/eyes-selenium - Javascript SDK
'use strict'

const { Builder, By } = require('selenium-webdriver');
const { Eyes, VisualGridRunner, RunnerOptions,Target, RectangleSize, Configuration, BatchInfo,BrowserType,DeviceName } = require('@applitools/eyes-selenium');

describe('ACME Bank', () => {
    let batch;
    let config;
    let runner;
    let driver;
    let eyes;

    before(async () => {

        // Create the runner object as an instance of VisualGridRunner so we run with the UFG
        // Also set the concurrency that tests are rendered with on the UFG
        runner = new VisualGridRunner(new RunnerOptions().testConcurrency(5));
        batch = new BatchInfo(`Selenium Javascript Examples`);
        config = new Configuration();
        config.setBatch(batch);

        // Tell the UFG which environments to run cross browser tests on
        config.addBrowser(800, 600, BrowserType.CHROME);
        config.addBrowser(800, 600, BrowserType.FIREFOX);
        config.addBrowser(800, 600, BrowserType.SAFARI);
        config.addBrowser(800, 600, BrowserType.EDGE_CHROMIUM);
        config.addBrowser(1200, 800, BrowserType.CHROME);
        config.addBrowser(1200, 800, BrowserType.FIREFOX);
        config.addBrowser(1200, 800, BrowserType.SAFARI);
        config.addBrowser(1200, 800, BrowserType.EDGE_CHROMIUM);
        config.addBrowser(1600, 1200, BrowserType.CHROME);
        config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        config.addBrowser(1600, 1200, BrowserType.SAFARI);
        config.addBrowser(1600, 1200, BrowserType.EDGE_CHROMIUM);
        config.addDeviceEmulation(DeviceName.iPhone_X);
        config.addDeviceEmulation(DeviceName.Pixel_4);
    });
    
    beforeEach(async function() {
        var capabilities = { browserName: 'chrome','goog:chromeOptions': {args: ['headless']}};
        driver = new Builder().withCapabilities(capabilities).build();
        await driver.manage().setTimeouts( { implicit: 10000 } );
        eyes = new Eyes(runner);
        eyes.setConfiguration(config);
        await eyes.open(driver, 'ACME Bank', this.currentTest.fullTitle(), new RectangleSize(1200, 600));
    })

    it('should log into a bank account', async () => {
        await driver.get("https://sandbox.applitools.com/bank");
        await eyes.check(Target.window().fully().withName("Login page"));
        await driver.findElement(By.css("#username")).sendKeys("username");
        await driver.findElement(By.css("#password")).sendKeys("password");
        await driver.findElement(By.id("log-in")).click();
        await eyes.check(Target.window().fully().withName("Main page").layout());
    });
    
    afterEach(async function() {
        await eyes.closeAsync();
        await driver.quit();
    });
    
    after(async () => {
        // Wait for all UFG renders to finish and log test results
        const allTestResults = await runner.getAllTestResults();
        console.log(allTestResults);
    });
})
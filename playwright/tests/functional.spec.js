const { test, expect } = require('@playwright/test');

test('Playwright Functional', async ({ page }) => {
    await page.goto('https://sandbox.applitools.com/bank?validateForm=true');
    
    /* VISUAL ASSERTIONS */
    // Assert background
    await expect(page.locator('.loginForm_loginScreen__wLxo_'))
        .toHaveCSS('background', 'rgba(0, 0, 0, 0) linear-gradient(to right bottom, rgb(26, 132, 123), rgb(255, 255, 255)) repeat scroll 0% 0% / auto padding-box border-box');

    // Assert Form Header
    const headerLocator = page.locator('.loginForm_loginFormHeader__fiIRG')
    await expect(headerLocator).toHaveCSS('color', 'rgb(62, 75, 91)')   
    await expect(headerLocator).toHaveCSS('border-bottom', '1px solid rgba(0, 0, 0, 0.1)')   

    // Assert Header Border Accent
    await expect(
        page.locator('.loginForm_loginFormHeader__fiIRG > div:nth-child(1)')
    ).toHaveCSS('background-color', 'rgb(26, 132, 123)')

    // Assert Submit Button
    const submitLocator = page.locator('.loginForm_formSubmit__WwZ_T')
    await expect(submitLocator).toHaveCSS('background-color', 'rgb(26, 132, 123)')   
    await expect(submitLocator).toHaveCSS('border', '2px solid rgb(26, 132, 123)');

    /* FUNCTIONAL ASSERTIONS */
    const usernameLocator = await page.locator('#username');
    const passwordLocator = page.locator('#password');
    const messageLocator = page.locator('.loginForm_formAlert__XtoFi')

    // Assert Failure - missing username & pass
    await submitLocator.click();
    await expect(messageLocator).toHaveText('Please enter a username and password');

    // Assert Failure - missing password
    await usernameLocator.type('user');
    await submitLocator.click();
    await expect(messageLocator).toHaveText('Please enter a password');

    // Assert Failure - missing username
    await usernameLocator.clear();
    await passwordLocator.type('password');
    await submitLocator.click();
    await expect(messageLocator).toHaveText('Please enter a username');

    // Assert successful login
    await usernameLocator.type('user');
    await submitLocator.click();
    await expect(page).toHaveURL('https://sandbox.applitools.com/bank/dashboard?validateForm=true')
});
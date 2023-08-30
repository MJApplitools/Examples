describe('Test Bank App', () => {
    beforeEach(() => {
        cy.eyesOpen({
            appName: 'ACME Bank',
            testName: 'Bank - Floating Regions Test'
        })
    })

    it('should capture dashboard', () => {
        cy.visit('http://localhost:3000/bank?floatRegion=true');

        // Use CSS Selectors to specify match level regions
        cy.eyesCheckWindow({ 
            tag: "Floating Icon",
            floating: {selector: '.loginForm_loginFormLogo__wweIT > a:nth-child(1) > svg:nth-child(1)', maxUpOffset: 10, maxDownOffset: 10, maxLeftOffset: 250, maxRightOffset: 80}
        });
    })

    afterEach(() => {
        cy.eyesClose()
    })
})
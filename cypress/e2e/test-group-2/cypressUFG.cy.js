describe('Cypress UFG', () => {
    beforeEach(() => {
        cy.eyesOpen({
            appName: 'ACME Bank',
            testName: 'Bank - UFG Test',
            // Tell the UFG which environments to run cross browser tests on
            browser: [
                {width: 800, height: 600, name: 'firefox'},
                {width: 800, height: 600, name: 'chrome'},
                {width: 800, height: 600, name: 'safari'},
                {width: 800, height: 600, name: 'edgechromium'},
                {width: 1200, height: 800, name: 'firefox'},
                {width: 1200, height: 800, name: 'chrome'},
                {width: 1200, height: 800, name: 'safari'},
                {width: 1200, height: 800, name: 'edgechromium'},
                {width: 1600, height: 1200, name: 'firefox'},
                {width: 1600, height: 1200, name: 'chrome'},
                {width: 1600, height: 1200, name: 'safari'},
                {width: 1600, height: 1200, name: 'edgechromium'},
                {deviceName: 'iPhone X'},
                {deviceName: 'Pixel 4'}
            ],            
            // Set the concurrency that tests are rendered with on the UFG
            concurrentSessions: 5
        })
    })

    it('should log into a bank account', () => {
        cy.visit('https://sandbox.applitools.com/bank?validateForm=true');

        cy.get('#log-in').click();
        // Assert Failure - missing username & pass
        cy.eyesCheckWindow({ tag: "Error shown - missing username & password" });

        cy.get('#username').type('user');
        cy.get('#log-in').click();
        // Assert Failure - missing username
        cy.eyesCheckWindow({ tag: "Error shown - missing username" });

        cy.get('#username').clear();
        cy.get('#password').type('password')
        cy.get('#log-in').click();
        // Assert Failure - missing password
        cy.eyesCheckWindow({ tag: "Error shown - missing password" });

        cy.get('#username').type('user');
        cy.get('#log-in').click();
        // Assert successful login
        cy.eyesCheckWindow({ tag: "Success - Dashboard shwon" });
    })

    afterEach(() => {
        cy.eyesClose()
    })

    after(async () => {
        // Wait for all UFG renders to finish and log test results
        const results = await cy.eyesGetAllTestResults();
        console.log(results);
    })
})
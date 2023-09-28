describe('Test Bank App', () => {
    beforeEach(() => {
        cy.eyesOpen({
            appName: 'ACME Bank',
            testName: 'Ignore Regions'
        })
    })

    it('should capture dashboard', () => {
        cy.visit('https://sandbox.applitools.com/bank/dashboard?layoutAlgo=true');

        // Use CSS Selectors to specify match level regions
        cy.eyesCheckWindow({ 
            tag: "Dynamic Dashboard",
            ignore: [
                {selector: '.dashboardOverview_accountBalances__3TUPB'},
                {selector: '.dashboardTable_dbTable___R5Du'}
            ]
        });
    })

    afterEach(() => {
        cy.eyesClose()
    })
})
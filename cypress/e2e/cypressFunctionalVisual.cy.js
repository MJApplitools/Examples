describe('Functionally Test Login', () => {
    beforeEach(() => {
        cy.eyesOpen({
            appName: 'ACME Bank',
            testName: 'Bank - Functional Test'
        })
    })

    it('should log into a bank account', () => {
        cy.visit('https://sandbox.applitools.com/bank?validateForm=true');

        cy.get('#log-in').click();
        // Assert Failure - missing username & pass
        cy.eyesCheckWindow({
            tag: "Error shown - missing username & password",
            target: 'window',
            fully: true
        });

        cy.get('#username').type('user');
        cy.get('#log-in').click();
        // Assert Failure - missing username
        cy.eyesCheckWindow({
            tag: "Error shown - missing username",
            target: 'window',
            fully: true
        });

        cy.get('#username').clear();
        cy.get('#password').type('password')
        cy.get('#log-in').click();
        // Assert Failure - missing password
        cy.eyesCheckWindow({
            tag: "Error shown - missing password",
            target: 'window',
            fully: true
        });

        cy.get('#username').type('user');
        cy.get('#log-in').click();
        // Assert successful login
        cy.eyesCheckWindow({
            tag: "Success - Dashboard shwon",
            target: 'window',
            fully: true
        });
    })
    
    afterEach(() => {
        cy.eyesClose()
    })
})
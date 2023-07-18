describe('Functionally Test Login', () => {
    it('should log into a bank account', () => {
        cy.visit('https://sandbox.applitools.com/bank?validateForm=true');

        cy.get('#log-in').click();
        // Assert Failure - missing username & pass
        cy.get('.loginForm_formAlert__XtoFi').should('have.text', 'Please enter a username and password');

        cy.get('#username').type('user');
        cy.get('#log-in').click();
        // Assert Failure - missing username
        cy.get('.loginForm_formAlert__XtoFi').should('have.text', 'Please enter a password');

        cy.get('#username').clear();
        cy.get('#password').type('password')
        cy.get('#log-in').click();
        // Assert Failure - missing password
        cy.get('.loginForm_formAlert__XtoFi').should('have.text', 'Please enter a username');

        cy.get('#username').type('user');
        cy.get('#log-in').click();
        // Assert successful login
        cy.url().should('eq', 'https://sandbox.applitools.com/bank/dashboard?validateForm=true')
    })
})
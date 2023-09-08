describe('Functionally Test Login', () => {
    it('should log into a bank account', () => {
        // cy.visit('https://sandbox.applitools.com/bank?floatRegion=true&validateForm=true');
        cy.visit('https://sandbox.applitools.com/bank?validateForm=true');

        /* VISUAL ASSERTIONS */

        // Assert background gradient
        cy.get('.loginForm_loginScreen__wLxo_')
            .should('have.css', 'background', 'rgba(0, 0, 0, 0) linear-gradient(to right bottom, rgb(26, 132, 123), rgb(255, 255, 255)) repeat scroll 0% 0% / auto padding-box border-box');

        // Assert Form Header
        cy.get('.loginForm_loginFormHeader__fiIRG')
            .should('have.css', 'color', 'rgb(62, 75, 91)')
            .should('have.css', 'border-bottom', '1px solid rgba(0, 0, 0, 0.1)')

        // Assert Header Border Accent
        cy.get('.loginForm_loginFormHeader__fiIRG > div:nth-child(1)')
            .should('have.css', 'background-color', 'rgb(26, 132, 123)')

        // Assert Submit Button
        cy.get('.loginForm_formSubmit__WwZ_T')
            .should('have.css', 'background-color', 'rgb(26, 132, 123)')
            .should('have.css', 'border', '2px solid rgb(26, 132, 123)');

        /* FUNCTIONAL ASSERTIONS */
        // Assert Failure - missing username & pass
        cy.get('#log-in').click();
        cy.get('.loginForm_formAlert__XtoFi').should('have.text', 'Please enter a username and password');

        // Assert Failure - missing password
        cy.get('#username').type('user');
        cy.get('#log-in').click();
        cy.get('.loginForm_formAlert__XtoFi').should('have.text', 'Please enter a password');

        // Assert Failure - missing username
        cy.get('#username').clear();
        cy.get('#password').type('password')
        cy.get('#log-in').click();
        cy.get('.loginForm_formAlert__XtoFi').should('have.text', 'Please enter a username');

        // Assert successful login
        cy.get('#username').type('user');
        cy.get('#log-in').click();
        // cy.url().should('eq', 'https://sandbox.applitools.com/bank/dashboard?floatRegion=true&validateForm=true')
        cy.url().should('eq', 'https://sandbox.applitools.com/bank/dashboard?validateForm=true')
    })
})
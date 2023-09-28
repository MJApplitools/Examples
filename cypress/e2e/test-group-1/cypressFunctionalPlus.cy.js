describe('Functionally Test Login', () => {
    it('should log into a bank account', () => {
        cy.visit('https://sandbox.applitools.com/bank?validateForm=true');

        // CSS/Attribute Assertions
        // Assert logo src
        cy.get('.loginForm_loginFormLogo__wweIT > a:nth-child(1) > img:nth-child(1)')
            .should('have.attr', 'src', '/_next/static/media/logo-big.518401d3.png');

        // Assert background gradient
        cy.get('.loginForm_loginScreen__wLxo_')
            .should('have.css', 'background', 'rgba(0, 0, 0, 0) linear-gradient(to right bottom, rgb(215, 187, 234), rgb(101, 168, 241)) repeat scroll 0% 0% / auto padding-box border-box');

        // Assert Form Header
        cy.get('.loginForm_loginFormHeader__fiIRG')
            .should('have.css', 'color', 'rgb(62, 75, 91)')
            .should('have.css', 'border-bottom', '1px solid rgba(0, 0, 0, 0.1)')

        // Assert Header Border Accent
        cy.get('.loginForm_loginFormHeader__fiIRG > div:nth-child(1)')
            .should('have.css', 'background-color', 'rgb(4, 123, 248)')

        // Assert Submit Button
        cy.get('.loginForm_formSubmit__WwZ_T')
            .should('have.css', 'background-color', 'rgb(4, 123, 248)')
            .should('have.css', 'border', '2px solid rgb(4, 123, 248)');

        // Functional Assertions
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
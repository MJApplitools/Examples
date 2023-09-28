describe('Functionally Test Login', () => {
    beforeEach(() => {
        cy.eyesOpen({
            appName: 'ACME Bank',
            testName: '3 Browser Test',
            browser: [
                {width: 1300, height: 1000, name: 'chrome'},
                {width: 1300, height: 1000, name: 'firefox'},
                {width: 1300, height: 1000, name: 'safari'}
            ]
        })
    })

    it('should run test', () => {
        cy.visit('https://sandbox.applitools.com/bank/dashboard?layoutAlgo=true');

        // cy.get('#log-in').click();
        cy.get('.dashboardNav_navContainer__kA4wD')
            .invoke('css', 'background-color', '#2A4494');
        cy.get('li.dashboardSideBar_dbSideNavExpandableOption__r18ny:nth-child(2) > a:nth-child(1)')
            .invoke('css', 'display', 'flex')
            .invoke('css', 'flex-direction', 'column');
           
        // cy.get('html').then(() => {
        //     const elem = document.createElement('style');
        //     elem.innerHTML = '.Navigation_navStyle__QG15l a {color: red !important}'
        //     document.head.appendChild(elem);
        // })
        // cy.window().then((win) => {
        //     win.eval(`const elem = document.createElement('style');
        //     elem.innerHTML = '.Navigation_navStyle__QG15l a {color: red !important}; font-family: Arial'
        //     document.head.appendChild(elem);`);
        // });
        cy.eyesCheckWindow({
            layout: [
                {selector: '.dashboardOverview_accountBalances__3TUPB'},
                {selector: '.dashboardTable_dbTable___R5Du'}
            ],
            content: [
                {selector: '.dashboardNav_navContainer__kA4wD'}
            ]
        });
        // cy.eyesCheckWindow({ tag: "" });

        // cy.get('#username').type('user');
        // cy.get('#log-in').click();
        // // Assert Failure - missing username
        // cy.eyesCheckWindow({ tag: "Error shown - missing username" });
    })

    afterEach(() => {
        cy.eyesClose()
    })
})
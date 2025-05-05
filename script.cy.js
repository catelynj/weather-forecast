describe('enter zip code, receive error message', () => {
    beforeEach(() => {
        cy.visit(`http://localhost:3000/`); //visit app
    })

    it('allows user to enter a zip code', () => {
        cy.get('form'); //get form elem
        cy.get('input').type('17701'); //get input elem, type in sample zip code
        cy.get('button[type="submit"]').click(); //get submit button, click
        cy.get('.forecastErrorInfo').should('exist');
    })
})

const APIKey = Cypress.env('API_KEY');

describe('call api', () => {
    beforeEach(() => {
        cy.visit(`http://localhost:3000/`); //visit app
    })
    
    //call api with api key in .env and sample zip code
    it('call api', () =>{
        cy.request({
            method: 'GET',
            url: 'https://api.weatherapi.com/v1/forecast.json?key=' + APIKey + '&q=17036&days=3',
        });
    })
})

describe('enter zip code, receive forecast', () =>{
    it('allows user to enter a zip code', () => {
        cy.visit(`http://localhost:3000/`); //visit app
        cy.get('form'); //get form elem
        cy.get('input').type('17701'); //get input elem, type in sample zip code
        cy.get('button[type="submit"]').click(); //get submit button, click

        cy.visit(`http://localhost:3000/api/weather?zip=17701`); //visit JSON 
        cy.get(JSON).contains(JSON.stringify({ "location": { "name": "Williamsport", "region": "Pennsylvania", "country": "United States of America", }})); //check for correct API response
    })
})
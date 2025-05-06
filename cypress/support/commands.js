// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.contains('Log in').click();
    cy.get('#mail').type(email);
    cy.get('#pass').type(password);
    cy.contains('Submit').click();
 })

Cypress.Commands.add("generateName", (length) => {
    let name = "";
    const chars = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЧЦЪЫЬЭЮЯабвгдеёжзиёклмнопрстуфхчцъыьэюя 1234567890";
    const charLength = chars.length;
    for (let i = 0; i < length; i++) {
        name += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return name;
    });

Cypress.Commands.add("addNewBook", (title, author, addToFavorite) => {
    cy.get("button[class='btn btn-warning']").click();
    cy.contains("Book description").should("be.visible");
    cy.get("#title").type(title);
    cy.get("#authors").type(author);
    if (addToFavorite) {
        cy.get("#favorite").click();
        };
        cy.contains("Submit").click();
        cy.contains(title).should('be.visible');
      });

Cypress.Commands.add("compareCollectionsLengthAfterRemovingFromFavorite", (selector) => {
    cy.get(selector).then((value) => {
    let totalCount = Cypress.$(value).length;
    cy.get(selector).first().click();
    cy.get(selector).should("have.length", totalCount - 1); 
       });
       cy.log("have.lenght");
    }); 
    
Cypress.Commands.add("countingLengthOfSelectedBooks", (selector) => {
    cy.get(selector).then((books) => {
    const count = books.length;
    cy.log(`Количество книг в избранном: ${count}`);
    });
 });

import { faker } from "@faker-js/faker";
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("generateFixture", () => {
  cy.writeFile("cypress/fixtures/user.json", {
    username: faker.name.firstName().slice(0, 13),
    email: faker.internet.email(),
    password: "Test123!",
  });
});

Cypress.Commands.add("login", () => {
  const user = {
    login: "test",
    password: "Test123!",
  };
  cy.viewport(1920, 1080);
  cy.visit("http://localhost:3000/");

  cy.get("nav").contains("log in", { matchCase: false }).click();
  cy.get("section[aria-labelledby=authDialog]").should("exist");
  cy.get("section[aria-labelledby=authDialog]")
    .find("input[name=login]")
    .type(user.login);
  cy.get("section[aria-labelledby=authDialog]")
    .find("input[name=password]")
    .type(user.password);
  cy.get("form").first().submit();
});

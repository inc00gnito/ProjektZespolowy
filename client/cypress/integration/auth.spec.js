import { faker } from "@faker-js/faker";

// describe("desktop auth tests", () => {
//   before(() => {
//     cy.generateFixture();
//     cy.fixture("user.json").then(function (user) {
//       cy.log(user);
//       this.user = user;
//     });
//   });

//   it("auth flow, register, logout, login", function () {
//
//     cy.visit("http://localhost:3000/");

//     //signup
//     cy.get("nav").contains("log in", { matchCase: false }).click();
//     cy.get("section[aria-labelledby=authDialog]").should("exist");
//     cy.contains("sign up", { matchCase: false }).click();
//     cy.get("section[aria-labelledby=authDialog]")
//       .find("input[name=email]")
//       .type(this.user.email);
//     cy.get("section[aria-labelledby=authDialog]")
//       .find("input[name=username]")
//       .type(this.user.username);
//     cy.get("section[aria-labelledby=authDialog]")
//       .find("input[name=password]")
//       .type(this.user.password);
//     cy.get("section[aria-labelledby=authDialog]")
//       .find("input[name=confirmPassword]")
//       .type(this.user.password);
//     cy.get("form").first().submit();

//     cy.get("section[aria-labelledby=authDialog]").should("not.exist");

//     cy.origin("http://localhost:3000/", () => {
//       expect(localStorage.getItem("token")).to.exist;
//     });
//     cy.get("nav").contains("upload", { matchCase: false }).should("exist");
//     cy.get("nav").contains("log in", { matchCase: false }).should("not.exist");

//     //logout

//     cy.get("nav button[aria-label='Account settings']").click();
//     cy.get("nav ul[role=menu]")
//       .contains("logout", { matchCase: false })
//       .parents("li")
//       .click();

//     cy.origin("http://localhost:3000/", () => {
//       expect(localStorage.getItem("token")).to.be.null;
//     });

//     cy.get("nav").contains("upload", { matchCase: false }).should("not.exist");
//     cy.get("nav").contains("log in", { matchCase: false }).should("exist");

//     //signin

//     cy.get("nav").contains("log in", { matchCase: false }).click();
//     cy.get("section[aria-labelledby=authDialog]").should("exist");
//     cy.get("section[aria-labelledby=authDialog]")
//       .find("input[name=login]")
//       .type(this.user.email);
//     cy.get("section[aria-labelledby=authDialog]")
//       .find("input[name=password]")
//       .type(this.user.password);
//     cy.get("form").first().submit();

//     cy.get("section[aria-labelledby=authDialog]").should("not.exist");

//     cy.origin("http://localhost:3000/", () => {
//       expect(localStorage.getItem("token")).to.exist;
//     });
//     cy.get("nav").contains("upload", { matchCase: false }).should("exist");
//     cy.get("nav").contains("sign in", { matchCase: false }).should("not.exist");
//   });
// });

describe("mobile auth tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.viewport(360, 640);
    cy.get("[data-testid=homelayout__mobile__hamburger]").as("hamburgerIcon");
  });
  it("hamburger should exist on mobile screen", () => {
    cy.get("@hamburgerIcon").should("exist");
  });
  it("mobile menu should show up by click on hambuer menu", () => {
    cy.get("@hamburgerIcon").click();
    cy.get("[aria-labelledby=mobilemenu]").should("exist");
  });
  it("mobile navigation shouldn't contain protected routes", () => {
    cy.get("@hamburgerIcon").click();
    cy.get("[aria-labelledby=mobilemenu]")
      .find("ul > li")
      .should("have.length", 3)
      .and("not.contain.text", "Settings");
  });
});

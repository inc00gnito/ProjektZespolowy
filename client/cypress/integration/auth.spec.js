describe("signup", () => {
  before(() => {
    cy.generateFixture();
    cy.fixture("user.json").then(function (user) {
      cy.log(user);
      this.user = user;
    });
  });
  it("can user register", function () {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.contains("log in", { matchCase: false }).click();
    cy.contains("sign up", { matchCase: false }).click();
    cy.get("section[aria-labelledby=authDialog]")
      .find("input[name=email]")
      .type(this.user.email);
    cy.get("section[aria-labelledby=authDialog]")
      .find("input[name=username]")
      .type(this.user.username);
    cy.get("section[aria-labelledby=authDialog]")
      .find("input[name=password]")
      .type(this.user.password);
    cy.get("section[aria-labelledby=authDialog]")
      .find("input[name=confirmPassword]")
      .type(this.user.password);

    cy.get("form").first().submit();

    cy.get("section[aria-labelledby=authDialog]").should("not.exist");
  });
});

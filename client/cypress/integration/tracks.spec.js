describe("track list functionality test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/tracks");
  });
  it("click on a song should render a audio player", () => {
    cy.get("ul[data-testid=track_list]").find("li").first().click();

    cy.get("[aria-label='Audio Player']").should("exist");
  });
});

describe("track sorting, filtering tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/tracks");
  });
  it("filter's button should open modal", () => {
    cy.get("[data-testid=tracks__filter] button").click();
    cy.get("[data-testid=modal__list]").should("exist");
  });
  it("sort's button should open modal", () => {
    cy.get("[data-testid=tracks__sort] button").click();
    cy.get("[data-testid=modal__list]").should("exist");
  });
  // it("click on nav item shouldn't redirect page while modal is open");
});

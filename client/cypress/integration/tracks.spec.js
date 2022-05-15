describe("track list functionality test", () => {
  it("click on a song should render a audio player", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/tracks");

    cy.get("ul[data-testid=track_list]").find("li").first().click();

    cy.get("[aria-label='Audio Player']").should("exist");
  });
});

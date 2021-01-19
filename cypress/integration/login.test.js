/// <reference types="cypress" />

context("Actions", () => {
  it("should login", () => {
    cy.visit("/");
    cy.get("input#email").type("email@email.com");
    cy.get("input#password").type("test");
    cy.get("#handleLoginBtn").should("be.visible");
    cy.get("#toRegisterBtn").should("be.visible");
    cy.get("#handleRegisterBtn").should("not.exist");
    cy.get("#toLoginBtn").should("not.exist");
    // cy.get("handleLoginBtn").click();
  });
});

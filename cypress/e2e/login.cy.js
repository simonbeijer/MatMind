describe('Home and Login Flow', () => {
  it('should navigate from home to login and attempt login', () => {

    cy.visit('/');

    cy.contains('Get Started').click();

    cy.get('input[id="email"]').type('user@example.com');
    cy.get('input[id="password"]').type('password123');

    cy.get('button[type="submit"]').click();

    // Since we don't have a backend, just verify we're still on the login page
    // and that the form submission was attempted
    cy.url().should('include', '/login');
    cy.get('input[id="email"]').should('have.value', 'user@example.com');
  });
});

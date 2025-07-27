describe('Home Page', () => {
  beforeEach(() => {
    // Ensure clean state for each test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should load home page and display key elements', () => {
    // Visit the home page
    cy.visit('/');
    
    // Verify page loads with expected content
    cy.get('header').should('be.visible');
    cy.contains('MatMind').should('be.visible');
    cy.contains('Train Smarter,').should('be.visible');
    cy.contains('Roll Better').should('be.visible');
    
    // Verify main CTA buttons are present
    cy.contains('Create My Plan').should('be.visible').and('not.be.disabled');
    cy.contains('See Example Plans').should('be.visible').and('not.be.disabled');
    
    // Verify features section is visible
    cy.contains('Your Personal BJJ Dream Team').should('be.visible');
    cy.contains('Technical Coach').should('be.visible');
    cy.contains('Mental Coach').should('be.visible');
    cy.contains('Recovery Specialist').should('be.visible');
  });

  it('should navigate from home to login page via main CTA', () => {
    // Visit the home page
    cy.visit('/');
    
    // Wait for page to load completely
    cy.contains('Train Smarter,').should('be.visible');
    
    // Click the main CTA button
    cy.contains('Create My Plan')
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    
    // Verify navigation to login page
    cy.url().should('include', '/login');
    
    // Verify the login page elements are present
    cy.get('header').should('exist');
    cy.get('header').contains('MatMind').should('be.visible'); // Logo should still be there
    cy.contains('Welcome Back').should('be.visible');
    cy.get('form').should('exist').and('be.visible');
    
    // Verify form fields are present
    cy.get('input[name="email"]').should('exist').and('be.visible');
    cy.get('input[name="password"]').should('exist').and('be.visible');
    cy.contains('button', 'Sign In').should('exist').and('be.visible');
  });

  it('should navigate from home to login page via header CTA', () => {
    // Visit the home page
    cy.visit('/');
    
    // Wait for page to load
    cy.get('header').should('be.visible');
    
    // Click the header Get Started button
    cy.get('header')
      .contains('Get Started')
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    
    // Verify navigation to login page
    cy.url().should('include', '/login');
    cy.contains('Welcome Back').should('be.visible');
  });
});

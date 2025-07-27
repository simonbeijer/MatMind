describe('Home and Login Flow', () => {
  beforeEach(() => {
    // Ensure we start fresh for each test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should navigate from home to login and attempt login', () => {
    // Visit the home page
    cy.visit('/');

    // Wait for the page to load and verify content
    cy.contains('Train Smarter,').should('be.visible');
    
    // Click the main CTA button to navigate to login
    cy.contains('Create My Plan').should('be.visible').and('not.be.disabled').click();

    // Verify we're on the login page
    cy.url().should('include', '/login');
    
    // Wait for the login form to be visible
    cy.get('form').should('be.visible');
    cy.contains('Welcome Back').should('be.visible');
    
    // Verify form fields are present and functional
    cy.get('input[name="email"]')
      .should('be.visible')
      .and('have.attr', 'type', 'email')
      .and('have.attr', 'placeholder', 'Enter your email')
      .type('user@example.com');
    
    cy.get('input[name="password"]')
      .should('be.visible')
      .and('have.attr', 'type', 'password')
      .and('have.attr', 'placeholder', 'Enter your password')
      .type('password123');

    // Verify form values are set correctly
    cy.get('input[name="email"]').should('have.value', 'user@example.com');
    cy.get('input[name="password"]').should('have.value', 'password123');

    // Click the Sign In button and verify it's clickable
    cy.contains('button', 'Sign In')
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    // Since we don't have a backend, the login will fail but verify the form interaction worked
    // We should still be on the login page with the email field retaining its value
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').should('have.value', 'user@example.com');
    
    // Wait a moment for any error message to appear, but don't require a specific one
    // since the backend behavior may vary
    cy.wait(1000);
  });

  it('should show validation errors for invalid inputs', () => {
    // Navigate to login page
    cy.visit('/login');
    
    // Wait for form to be visible
    cy.get('form').should('be.visible');
    
    // Test invalid email format
    cy.get('input[name="email"]')
      .type('invalid-email')
      .blur(); // Trigger validation on blur
    
    // Should show email validation error
    cy.contains('Please enter a valid email address').should('be.visible');
    
    // Test password that's too short
    cy.get('input[name="password"]')
      .type('short')
      .blur(); // Trigger validation on blur
    
    // Should show password validation error
    cy.contains('Minimum 8 characters required').should('be.visible');
    
    // Clear fields and test empty submission
    cy.get('input[name="email"]').clear().blur();
    cy.get('input[name="password"]').clear().blur();
    
    // Should show required field errors
    cy.contains('This field is required').should('be.visible');
  });
});

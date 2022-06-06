describe('login.cy.js', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it has an admin dashboard header', () => {
    cy.get('h2.ui.icon.header').contains('Admin dashboard');
    cy.get('div.sub.header').contains('Manage your restaurants with ease');
  });

  it('has a email/phone input field with placeholder', () => {
    cy.get('form')
      .find('input#email')
      .should('have.attr', 'placeholder', 'Email/Phone number');
  });

  it('has a password input field with placeholder', () => {
    cy.get('form')
      .find('input#password')
      .should('have.attr', 'type', 'password')
      .should('have.attr', 'placeholder', 'Password');
  });

  it('accepts email/phone input', () => {
    const input = 'ahmed@hotmail.fr';
    cy.get('#email').type(input).should('have.value', input);
  });

  it('accepts password input', () => {
    const input = '123456';
    cy.get('#password').type(input).should('have.value', input);
  });

  it("it has a 'Login' button", () => {
    cy.get('form').find('button').should('have.text', 'Login');
  });

  it('should login successfully', () => {
    cy.fixture('correct-credentials').then(function (data) {
      cy.get('#email').type(data.email);
      cy.get('#password').type(data.password);
      cy.get('#login').click();
      cy.wait(500);
      cy.get('#success').contains('LoggedIn');
    });
  });

  it('should throw error given wrong credentials', () => {
    cy.fixture('wrong-credentials').then(function (data) {
      cy.get('#email').type(data.email);
      cy.get('#password').type(data.password);
      cy.get('#login').click();
      cy.wait(500);
      cy.get('#error').contains('Wrong credentials');
    });
  });
});

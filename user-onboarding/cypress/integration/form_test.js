describe('Forms App', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('sanity check', () => {
        expect(2 + 2).to.equal(4)
        expect(2 + 2).not.to.equal(5)
    })

    const nameInputField = () => cy.get(':nth-child(1) > input')
    const emailInput = () => cy.get(':nth-child(2) > input')
    const passwordInput = () => cy.get(':nth-child(3) > input')
    const checkBox = () => cy.get(':nth-child(4) > input')
    const dropDown = () => cy.get('select')
    const submitButton = () => cy.get('button')

    it('make sure we can input a name', () => {
        const name = 'Jayaram Sivaraman Nair'
        nameInputField().type(name).should('have.value', name)
    })

    it('make sure that header is present', () => {
        cy.contains('Sign Up Form')
    })

    it('make sure that e-mail address and password can be input', () => {
        const emailAddress = 'jsnair46@gmail.com'
        emailInput().type(emailAddress).clear()
        passwordInput().type('Jayaram123').clear()
    })

    it('make sure that the terms of service can be checked', () => {
        checkBox().check().should('be.checked')
        checkBox().uncheck().should('not.be.checked')
    })

    it('make sure to check that a role can selected from dropdown', () => {
        dropDown().select('Software Engineer').should('have.value', '3')
        dropDown().select('--Select One--')
    })

    it('make sure that the form can be submitted', () => {
        nameInputField().type('Tom and Jerry')
        emailInput().type('jerry@mouseway.com')
        passwordInput().type('JerryL0vesTom')
        checkBox().check()
        dropDown().select('Software Engineer')
        submitButton().click()
    })

    it('make sure that validation error pops up if an input field is empty', () => {
        nameInputField().type('Satoshi Nakamoto')
        emailInput().type('satoshi@invisible.com')
        passwordInput().type('Sat0shi4')
        checkBox().check()
        dropDown().select('Educator')
        passwordInput().clear()
    })
})
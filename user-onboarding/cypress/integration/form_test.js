describe('Forms App', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('sanity check', () => {
        expect(2 + 2).to.equal(4)
        expect(2 + 2).not.to.equal(5)
    })

    it('make sure we can input a name', () => {
        const nameInputField = () => cy.get(':nth-child(1) > input')
        const name = 'Jayaram Sivaraman Nair'

        nameInputField().type(name).should('have.value', name)
    })

    it('make sure that header is present', () => {
        cy.contains('Sign Up Form')
    })

    it('make sure that e-mail address and password can be input', () => {
        const emailInput = () => cy.get(':nth-child(2) > input')
        const emailAddress = 'jsnair46@gmail.com'
        emailInput().type(emailAddress).clear()

        const passwordInput = () => cy.get(':nth-child(3) > input')
        passwordInput().type('Jayaram123').clear()
    })
})
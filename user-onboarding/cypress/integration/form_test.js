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

        nameInputField().clear().type(name)
        nameInputField().should('have.value', name)
    })
})
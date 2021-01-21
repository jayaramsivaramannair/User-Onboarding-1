describe('Forms App', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('sanity check', () => {
        expect(2 + 2).to.equal(4)
        expect(2 + 2).not.to.equal(5)
    })
})
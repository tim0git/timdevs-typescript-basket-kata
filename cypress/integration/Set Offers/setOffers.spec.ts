describe('CDL Basket Kata', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('displays new offer price in pence when set', () => {
        cy.get('[data-cy="A offer input"]').clear().type(120)
        cy.get('[data-cy=SubmitPricingForm]').click()
        cy.get('[aria-label="A offer"]').should('have.text', 'Buy 2 for only £1.20')
    })

    it('displays new minPurchase when set', () => {
        cy.get('[data-cy="A minimum purchase input"]').clear().type(8)
        cy.get('[data-cy=SubmitPricingForm]').click()
        cy.get('[aria-label="A offer"]').should('have.text', 'Buy 8 for only £0.45')
    })

    it('does NOT display an offer when minPurchase is set to less than 2', () => {
        cy.get('[data-cy="A minimum purchase input"]').clear().type(1)
        cy.get('[data-cy=SubmitPricingForm]').click()
        cy.get('[aria-label="A offer"]').should('not.exist')
    })

    it('does NOT display an offer when minPurchase is set to 0', () => {
        cy.get('[data-cy="A minimum purchase input"]').clear().type(0)
        cy.get('[data-cy=SubmitPricingForm]').click()
        cy.get('[aria-label="A offer"]').should('not.exist')
    })

    it('does NOT display offer when offer price in pence is set to less than 1', () => {
        cy.get('[data-cy="A offer input"]').clear().type(0)
        cy.get('[data-cy=SubmitPricingForm]').click()
        cy.get('[aria-label="A offer"]').should('not.exist')
    })

    it('adds item to basket when add to basket is pressed', () => {
        cy.get('[data-cy=SubmitPricingForm]').click()
        cy.get('[data-cy="add A to basket"]').click()
        cy.get('[aria-label="basket item"]').should('have.text', 'A')
        cy.get('[aria-label="basket item count"]').should('have.text', '1')
    })

    it('adds two A items to basket when add to basket is pressed twice', () => {
        cy.get('[data-cy=SubmitPricingForm]').click()
        cy.get('[data-cy="add A to basket"]').click()
        cy.get('[data-cy="add A to basket"]').click()
        cy.get('[aria-label="basket item"]').should('have.text', 'A')
        cy.get('[aria-label="basket item count"]').should('have.text', '2')
    })

    it('adds two B items to basket when add to basket is pressed twice', () => {
        cy.get('[data-cy=SubmitPricingForm]').click()
        cy.get('[data-cy="add B to basket"]').click()
        cy.get('[data-cy="add B to basket"]').click()
        cy.get('[aria-label="basket item"]').should('have.text', 'B')
        cy.get('[aria-label="basket item count"]').should('have.text', '2')
    })

    it('returns the user to the offer page when checkout is pressed', () => {
        cy.get('[data-cy=SubmitPricingForm]').click()
        cy.get('[data-cy="add B to basket"]').click()
        cy.get('[data-cy="add B to basket"]').click()
        cy.get('[aria-label="basket item"]').should('have.text', 'B')
        cy.get('[aria-label="basket item count"]').should('have.text', '2')
        cy.get('[data-cy="CheckOut Button"]').click()
        cy.get('[data-cy="Pricing Form Instruction"]').should('be.visible')
    })
})
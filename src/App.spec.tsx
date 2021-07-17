import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('<App>', () => {
    test('should set a new price for SKU A when price is changed and submit button pressed', () => {
        // ** Set **
        render(<App />)
        
        // ** Act **
        const offerInputPrice = screen.getByLabelText('A offer input')
        fireEvent.change(offerInputPrice, {target: {value:50}})
        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)

        // ** Expect **
        const offerPrice = screen.getByLabelText('A offer')
        expect(offerPrice).toHaveTextContent('Buy 2 for only £0.50')
    })
    test('should set a new minPurchase quantity for SKU A when minPurchase is changed and submit button pressed', () => {
        // ** Set **
        render(<App />)

        // ** Act **
        const offerMinPurchase = screen.getByLabelText('A minimum purchase input')
        fireEvent.change(offerMinPurchase, {target: {value:8}})
        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)

        // ** Expect **
        const offerPrice = screen.getByLabelText('A offer')
        expect(offerPrice).toHaveTextContent('Buy 8 for only £0.45')
    })
    test('should NOT render an offer if minPurchase quantity is set to 0', () => {
        // ** Set **
        render(<App />)

        // ** Act **
        const offerMinPurchase = screen.getByLabelText('A minimum purchase input')
        fireEvent.change(offerMinPurchase, {target: {value:0}})
        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)

        // ** Expect **
        const offerPrice = screen.queryByLabelText('A offer')
        expect(offerPrice).not.toBeInTheDocument()
    })
    test('should NOT render an offer if minPurchase quantity is set to 1', () => {
        // ** Set **
        render(<App />)

        // ** Act **
        const offerMinPurchase = screen.getByLabelText('A minimum purchase input')
        fireEvent.change(offerMinPurchase, {target: {value:1}})
        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)

        // ** Expect **
        const offerPrice = screen.queryByLabelText('A offer')
        expect(offerPrice).not.toBeInTheDocument()
    })
    test('should NOT render an offer if minPurchase quantity is less than 0', () => {
        // ** Set **
        render(<App />)

        // ** Act **
        const offerMinPurchase = screen.getByLabelText('A minimum purchase input')
        fireEvent.change(offerMinPurchase, {target: {value: -1}})
        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)

        // ** Expect **
        const offerPrice = screen.queryByLabelText('A offer')
        expect(offerPrice).not.toBeInTheDocument()
    })
    test('should NOT render an offer if offer price is set to 0', () => {
        // ** Set **
        render(<App />)

        // ** Act **
        const offerInputPrice = screen.getByLabelText('A offer input')
        fireEvent.change(offerInputPrice, {target: {value:0}})
        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)

        // ** Expect **
        const offerPrice = screen.queryByLabelText('A offer')
        expect(offerPrice).not.toBeInTheDocument()
    })
    test('should NOT render an offer if offer price is less than 0', () => {
        // ** Set **
        render(<App />)

        // ** Act **
        const offerInputPrice = screen.getByLabelText('A offer input')
        fireEvent.change(offerInputPrice, {target: {value:-45}})
        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)

        // ** Expect **
        const offerPrice = screen.queryByLabelText('A offer')
        expect(offerPrice).not.toBeInTheDocument()
    })
    test('should add item to basket once when add item button is pressed', () => {
        // ** Set **
        render(<App />)
        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)

        // ** Act **
        const addAToBasket = screen.getByLabelText('add A to basket')
        fireEvent.click(addAToBasket)

        // ** Expect **
        const basketAItem = screen.queryByLabelText('basket item')
        const basketAItemCount = screen.queryByLabelText('basket item count')
        expect(basketAItem).toBeInTheDocument()
        expect(basketAItemCount).toHaveTextContent('1')
    })
    test('should add item to basket twice when add item button is pressed twice', () => {
        // ** Set **
        render(<App />)
        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)

        // ** Act **
        const addAToBasket = screen.getByLabelText('add A to basket')
        fireEvent.click(addAToBasket)
        fireEvent.click(addAToBasket)

        // ** Expect **
        const basketAItem = screen.queryByLabelText('basket item')
        const basketAItemCount = screen.queryByLabelText('basket item count')
        expect(basketAItem).toBeInTheDocument()
        expect(basketAItemCount).toHaveTextContent('2')
    })
    test('should return you to the offer screen when you push the checkout button', () => {
        // ** Set **
        render(<App />)
        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)

        // ** Act **
        const addAToBasket = screen.getByLabelText('add A to basket')
        fireEvent.click(addAToBasket)
        fireEvent.click(addAToBasket)
        const checkOutButton = screen.getByRole('button', { name: 'CheckOut' })
        fireEvent.click(checkOutButton)

        // ** Expect **
        const offerScreenInstruction = screen.queryByText('Please set offers before shopping')
        expect(offerScreenInstruction).toBeInTheDocument()
    })
})

import { Basket } from '../../App.types'
import { updateBasketContents } from './updateBasketContents'

const basket: Basket = {}

describe('updateBasketContents()', () => {
    test('should return an Object', () => {
        const result = updateBasketContents(basket, undefined)
        expect(typeof result).toBe('object')
        expect(Array.isArray(result)).toBe(false)
    })
    test('should create item in basket if it does not already exist', () => {
        const item_id: string = 'A' 
        const result = updateBasketContents(basket, item_id)
        expect(result).toHaveProperty("A", 1)
    })
    test('should increase the item count if it already exists', () => {
        const mock_basket = {A : 1}
        const item_id: string = 'A' 
        const result = updateBasketContents(mock_basket, item_id)
        expect(result).toHaveProperty("A", 2)
    })
    test('should add a new unique item to an existing basket', () => {
        const mock_basket = {A : 1}
        const item_id: string = 'B' 
        const result = updateBasketContents(mock_basket, item_id)
        expect(result).toHaveProperty("A", 1)
        expect(result).toHaveProperty("B", 1)
    })
    test('should return a basket that holds a different memory reference form the original', () => {
        const item_id: string = 'A' 
        const result = updateBasketContents(basket, item_id)
        expect(result).not.toBe(basket)
    })
    test('should not mutate the original basket', () => {
        const item_id: string = 'A'
        const controlBasket = {}
        updateBasketContents(basket, item_id)
        expect(basket).toEqual(controlBasket)
    })
    test('should return the original basket if item_id is undefined', () => {
        const item_id: undefined = undefined 
        const result = updateBasketContents(basket, item_id)
        expect(result).toBe(basket)
    })
    test('should return the original basket with no mutation if the item_id is undefined', () => {
        const item_id: undefined = undefined 
        const controlBasket = {}
        updateBasketContents(basket, item_id)
        expect(basket).toEqual(controlBasket)
    })
})

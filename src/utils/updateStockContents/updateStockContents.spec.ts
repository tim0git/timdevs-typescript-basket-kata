import { Catalogue } from '../../App.types'
import { updateStockContents, UpdateStockContentsProps } from './updateStockContents'
import { base_price_list } from '../../resources/base_price_list'

describe('updateStockContents()', () => {
    test('should return an Object', () => {
        const updateStockContentsParameters: UpdateStockContentsProps = {
            stock: base_price_list,
            stockSku:'A',
            key: "",
            value: ""
        }
        const result : Catalogue = updateStockContents(updateStockContentsParameters)
        expect(typeof result).toBe('object')
        expect(Array.isArray(result)).toBe(false)
    })
    test('should update the key that is a child of the stockSku provided', () => {
        const updateStockContentsParameters: UpdateStockContentsProps = {
            stock: base_price_list,
            stockSku:'A',
            key: "offer",
            value: "999"
        }
        const result : Catalogue = updateStockContents(updateStockContentsParameters)
        expect(result.A).toHaveProperty('offer', 999)
    })
    test('should parse string value at store an integer in stock list', () => {
        const updateStockContentsParameters: UpdateStockContentsProps = {
            stock: base_price_list,
            stockSku:'B',
            key: "offer",
            value: "999"
        }
        const result : Catalogue = updateStockContents(updateStockContentsParameters)
        expect(typeof result.B.offer).toBe('number')
    })
    test('should only mutate the stockSku provided', () => {
        const updateStockContentsParameters: UpdateStockContentsProps = {
            stock: base_price_list,
            stockSku:'A',
            key: "offer",
            value: "999"
        }
        const result : Catalogue = updateStockContents(updateStockContentsParameters)
        expect(result.B).toEqual(base_price_list.B)
        expect(result.C).toEqual(base_price_list.C)
        expect(result.D).toEqual(base_price_list.D)
    })
    test('should only mutate the key value pair passed in', () => {
        const updateStockContentsParameters: UpdateStockContentsProps = {
            stock: base_price_list,
            stockSku:'A',
            key: "offer",
            value: "999"
        }
        const result : Catalogue = updateStockContents(updateStockContentsParameters)
        expect(result.A).toHaveProperty('price', 30)
        expect(result.A).toHaveProperty('minPurchase', 2)
    })
    test('should return the original stock contents if key or value is undefined', () => {
        const updateStockContentsParameters: UpdateStockContentsProps = {
            stock: base_price_list,
            stockSku:'A',
            key: undefined,
            value: undefined
        }
        const result : Catalogue = updateStockContents(updateStockContentsParameters)
        expect(result).toBe(base_price_list)
    })
    test('should return the original stock contents if key is an empty string', () => {
        const updateStockContentsParameters: UpdateStockContentsProps = {
            stock: base_price_list,
            stockSku:'A',
            key: "",
            value: ""
        }
        const result : Catalogue = updateStockContents(updateStockContentsParameters)
        expect(result).toBe(base_price_list)
    })
    test('should set the value as an empty string is the value key is undefined', () => {
        const updateStockContentsParameters: UpdateStockContentsProps = {
            stock: base_price_list,
            stockSku:'A',
            key: "offer",
            value: undefined
        }
        const result: Catalogue = updateStockContents(updateStockContentsParameters)
        expect(result.A).toHaveProperty('offer', "")
    })
    test('should not return the origin stock list when a key value pair and sku is provided', () => {
        const updateStockContentsParameters: UpdateStockContentsProps = {
            stock: base_price_list,
            stockSku:'A',
            key: "offer",
            value: "999"
        }
        const result: Catalogue = updateStockContents(updateStockContentsParameters)
        expect(result).not.toBe(base_price_list)
    })
    test('should not mutate the original stock list', () => {
        const controlStockList : Catalogue = {
            A: {
                price: 30,
                offer: 45,
                minPurchase: 2,
            },
            B: {
                price: 20,
                offer: 100,
                minPurchase: 8,
            },
            C: {
                price: 15,
                offer: 25,
                minPurchase: 3,
            },
            D: {
                price: 10,
                offer: 30,
                minPurchase: 5,
            }
        }
        const updateStockContentsParameters: UpdateStockContentsProps = {
            stock: base_price_list,
            stockSku:'A',
            key: "offer",
            value: "999"
        }

        updateStockContents(updateStockContentsParameters)

        expect(base_price_list).toEqual(controlStockList)
    })
})

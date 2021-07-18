import { calculateBasketTotal } from './calculateBasketTotal'
import { base_price_list } from '../../resources/base_price_list'

const stock = base_price_list;

const stockNoOffers = {
  A: {
    price: 30,
    offer: 0,
    minPurchase: 0,
  },
  B: {
    price: 20,
    offer: 0,
    minPurchase: 0,
  },
  C: {
    price: 15,
    offer: 0,
    minPurchase: 0,
  },
  D: {
    price: 10,
    offer: 0,
    minPurchase: 0,
  },
};

const basket = {A: 4, B: 2, C: 4, D: 4};

describe('calculateBasketTotal()', () => {
  it('when basket is empty must return £0.00', () => {
    expect(calculateBasketTotal({}, stock)).toBe('0.00');
  });
  it('when basket has a single item in it, should return the price 0.30', () => {
    expect(calculateBasketTotal({A: 1}, stock)).toBe('0.30');
  });
  it('when basket has enough item to qualify for offer should return offer price £0.45', () => {
    expect(calculateBasketTotal({A: 2}, stock)).toBe('0.45');
  });
  it('when basket has enough item to qualify for offer and more should return offer price £0.45 plus the standard cost for remaining items £0.30', () => {
    expect(calculateBasketTotal({A: 3}, stock)).toBe('0.75');
  });
  it('should calculate the correct amount for two keys and one offer having been met', () => {
    expect(calculateBasketTotal({A: 2, B: 1}, stock)).toBe('0.65');
  });
  it('should calculate the correct amount when two offers have been met for two separate keys', () => {
    expect(calculateBasketTotal({A: 2, B: 9}, stock)).toBe('1.65');
  });
  it('should calculate the correct amount when the basket includes one of every item', () => {
    const basket = {A: 1, B: 1, C: 1, D: 1};
    expect(calculateBasketTotal(basket, stock)).toBe('0.75');
  });
  it('should calculate the correct amount when basket contains one of every item and one offer has been met', () => {
    const basket = {A: 2, B: 1, C: 1, D: 1};
    expect(calculateBasketTotal(basket, stock)).toBe('0.90');
  });
  it('test passes for full basket', () => {
    const basket = {A: 4, B: 2, C: 4, D: 4};
    expect(calculateBasketTotal(basket, stock)).toBe('2.10');
  });
  it('basket object has not been mutated and is the same as the original', () => {
    const basketCheck = {A: 4, B: 2, C: 4, D: 4};
    calculateBasketTotal(basket, stock);
    expect(basket).toEqual(basketCheck);
  });
  it('stock object has not been mutated and is the same as the original', () => {
    const stockCheck = {
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
      },
    };
    calculateBasketTotal(basket, stock);
    expect(stock).toEqual(stockCheck);
  });
  it('should work when no offers are available', () => {
    const basket = {A: 4, B: 2, C: 4, D: 4};
    expect(calculateBasketTotal(basket, stockNoOffers)).toBe('2.60');
  });
});

// must be pure and not mutate the original data
// must return a integer that represents the basket total
// must return the integer to 2 dp.
// when basket is empty must return £0.00
// use toBe as we are comparing a primitive data type for £0.00 ect.
// use toEqual when comparing [] && {} contents as we are comparing contents not memory ref.

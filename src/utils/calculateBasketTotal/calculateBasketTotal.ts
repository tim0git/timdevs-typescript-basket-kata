import { Catalogue, Basket } from "../../App.types";

export const calculateBasketTotal = (basket:Basket, stock: Catalogue) => {
  let total = 0;
  for (let item in basket) {
    if (basket[item] >= stock[item].minPurchase && stock[item].minPurchase > 0) {
      let offerCount = Math.floor(basket[item] / stock[item].minPurchase);
      total += (offerCount * stock[item].offer) / 100;
      if (basket[item] % stock[item].minPurchase) {
        const remainderCount = basket[item] - offerCount * stock[item].minPurchase;

        total += (remainderCount * stock[item].price) / 100;
      }
    } else {
      total += (stock[item].price * basket[item]) / 100;
    }
  }
  return total.toFixed(2);
};
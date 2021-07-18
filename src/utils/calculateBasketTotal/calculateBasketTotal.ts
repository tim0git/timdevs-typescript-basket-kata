import { Catalogue, Basket } from "../../App.types";

export const calculateBasketTotal = (basket:Basket, stock: Catalogue): string => {
  let basketTotal: number = 0;

  const itemIsEligibleForOffer = (totalNumberOfItem: number, minPurchaseRequirement: number): boolean => {
    return totalNumberOfItem >= minPurchaseRequirement && minPurchaseRequirement > 0
  }

  const applyNormalPrice = (numberOfItems: number, item: string): number => {
    return (numberOfItems * stock[item].price) / 100;
  }

  const applyOfferPrice = (countOfItemThatQualifyForOffer: number, item:string):number => {
    return (countOfItemThatQualifyForOffer * stock[item].offer) / 100;
  }

  const calculateNumberOfItemThatQualifyForOffer = (totalNumberOfItem: number, minPurchaseRequirement: number ) => {
    return Math.floor(totalNumberOfItem / minPurchaseRequirement)
  }

  const notAllItemsAreCoveredByAnOffer = (totalNumberOfItem: number, minPurchaseRequirement: number): boolean => {
    const numberOfItemsNotEligibleForAnOffer = totalNumberOfItem % minPurchaseRequirement
    return numberOfItemsNotEligibleForAnOffer !== 0
  }

  const calculateNumberOfItemsThatDoNotQualifyForOffer = (totalNumberOfItem: number, countOfItemThatQualifyForOffer: number, minPurchaseRequirement: number ) => {
    return totalNumberOfItem - countOfItemThatQualifyForOffer * minPurchaseRequirement
  }

  for (let item in basket) {

    const totalNumberOfItem = basket[item]
    const minPurchaseRequirement = stock[item].minPurchase
    
    if (itemIsEligibleForOffer(totalNumberOfItem, minPurchaseRequirement)) {

      const countOfItemThatQualifyForOffer = calculateNumberOfItemThatQualifyForOffer(totalNumberOfItem, minPurchaseRequirement);

      basketTotal += applyOfferPrice(countOfItemThatQualifyForOffer, item)

      if (notAllItemsAreCoveredByAnOffer(totalNumberOfItem, minPurchaseRequirement)) {
        
        const countOfItemThatDoNotQualifyForOffer = calculateNumberOfItemsThatDoNotQualifyForOffer(totalNumberOfItem, countOfItemThatQualifyForOffer, minPurchaseRequirement)

        basketTotal += applyNormalPrice(countOfItemThatDoNotQualifyForOffer, item)
      }

    } else {

        basketTotal += applyNormalPrice(totalNumberOfItem, item)
    }
  }
  return basketTotal.toFixed(2);
};
import { Basket } from "../../App.types"

export const updateBasketContents = (basket: Basket, item_id: string | undefined ): Basket => {
    if (item_id === undefined) {
        return basket
    }

    if (basket[item_id]) {
        return {
        ...basket,
        [item_id]: basket[item_id] + 1,
        }
    } else {
        return {
        ...basket,
        [item_id]: 1,
        }
    }
}

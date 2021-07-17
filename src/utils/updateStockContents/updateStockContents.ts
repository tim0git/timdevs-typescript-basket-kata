import { Catalogue } from "../../App.types"

export interface UpdateStockContentsProps {stock: Catalogue, stockSku: string, key: string | undefined, value: string | undefined}

export const updateStockContents = ({ stock, stockSku, key, value }: UpdateStockContentsProps): Catalogue => {

    if (key  === undefined || key === "") {
        return stock
    }

    return {
      ...stock,
      [stockSku]: {
        ...stock[stockSku],
        [key]: !value ? "" : parseInt(value),
      },
    }
}

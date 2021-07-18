export type CatalogueItem = {
  price: number,
  offer: number,
  minPurchase: number,
}

export interface Catalogue {
  [key: string]: CatalogueItem
}

export interface Basket {
  [key: string]: number
}
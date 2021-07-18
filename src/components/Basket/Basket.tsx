import React from "react";
import * as TYPES from '../../App.types'
import { calculateBasketTotal } from "../../utils/calculateBasketTotal/calculateBasketTotal";

export interface Props {
  basket: TYPES.Basket,
  stock: TYPES.Catalogue,
  resetPricing: (event: React.MouseEvent) => void,
}

const Basket: React.FC<Props> = ({ basket, stock, resetPricing }) => {
  
  const basketContents: [string, number][]= Object.entries(basket)

  return (
    <div>
      <button onClick={resetPricing} data-cy='CheckOut Button'>CheckOut</button>
      <p aria-label='basket total in GBP'>Total cost of goods: £{calculateBasketTotal(basket, stock)}</p>
      <h2>Basket</h2>
      <div className="basketContainer">
        {basketContents.map(([sku, count]) => {
          return (
            <div key={sku} className="basketItem">
              <p aria-label='basket item'>{sku}</p>
              <p aria-label='basket item count'>{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Basket

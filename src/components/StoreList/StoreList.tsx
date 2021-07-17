import React from "react";
import { Catalogue } from "../../App.types";

export interface Props {
  addToBasket: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item_id: string) => void
  catalogue: Catalogue
}

const StoreList: React.FC<Props> = ({ catalogue, addToBasket }) => {
  return (
    <div className="stockContainer">
      {Object.entries(catalogue).map(([name, values]) => {
        return (
          <div key={name}>
            <h2>Stock Name: {name}</h2>
            <p>Price: £{(values.price / 100).toFixed(2)}</p>
            {values.minPurchase > 1 && values.offer > 0 && (
              <>
                <p>Offer...</p>
                <p aria-label={`${name} offer`}>{`Buy ${values.minPurchase} for only £${(
                  values.offer / 100
                ).toFixed(2)}`}</p>
              </>
            )}
            <button aria-label={`add ${name} to basket`} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => addToBasket(e, name)}>Add to Basket</button>
          </div>
        );
      })}
    </div>
  );
}

export default StoreList

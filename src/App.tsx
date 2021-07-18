import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import PricingForm from "./components/PricingForm/PricingForm";
import StoreList from "./components/StoreList/StoreList";
import Basket from "./components/Basket/Basket";
import * as TYPES from './App.types'
import {base_price_list} from './resources/base_price_list'
import { updateBasketContents } from "./utils/updateBasketContents/updateBasketContents";

function App() {

  const [catalogue, setCatalogue] = useState<TYPES.Catalogue>(base_price_list)

  const [priceLoaded, setPriceLoaded] = useState<boolean>(false)

  const [basket, setBasket] = useState<TYPES.Basket>({})

  const addToBasket = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item_id: string) => setBasket(updateBasketContents(basket, item_id));

  const resetPricing = (event: React.MouseEvent): void => {
    setCatalogue(base_price_list)
    setPriceLoaded(false)
    setBasket({});
  };

   return (
      <div className="App">
        <Header />
        {priceLoaded ? (
          <div className="shopContainer">
            <StoreList
              catalogue={catalogue}
              addToBasket={addToBasket}
            />
            <Basket
              basket={basket}
              stock={catalogue}
              resetPricing={resetPricing}
            />
          </div>
        ) : (
           <PricingForm setCatalogue={setCatalogue} setPriceLoaded={setPriceLoaded} catalogue={catalogue}/>
        )}
      </div>
    );
}

export default App;

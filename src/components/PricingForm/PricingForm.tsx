import React, { useState } from 'react';
import { Catalogue } from '../../App.types';
import { updateStockContents, UpdateStockContentsProps } from '../../utils/updateStockContents/updateStockContents';
import SkuForm from '../SkuForm/SkuForm';

export interface Props {
  setCatalogue: React.Dispatch<Catalogue>
  setPriceLoaded: React.Dispatch<boolean>
  catalogue: Catalogue
}

const PricingForm: React.FC<Props> = ({ catalogue, setCatalogue, setPriceLoaded }) => {
  
  const [stock, setStock] = useState<Catalogue>(catalogue)

  const handleSetState = (e: React.ChangeEvent<HTMLInputElement>, stockSku: string) => {
    const name: string = e.target.name;
    const value: string = e.target.value;
    
    const stockContentProps: UpdateStockContentsProps = {
      stock,
      stockSku,
      key: name,
      value
    }

    setStock(updateStockContents(stockContentProps))
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setCatalogue(stock)
    setPriceLoaded(true)
  };

  return (
    <>
      <p data-cy='Pricing Form Instruction'>Please set offers before shopping</p>
      <form className="pricingContainer">
        {Object.entries(stock).map((sku) => {
          return <SkuForm key={sku[0]} sku={sku} handleSetState={handleSetState} />;
        })}
        <br />
        <button data-cy="SubmitPricingForm" onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </>
  );
}

export default PricingForm

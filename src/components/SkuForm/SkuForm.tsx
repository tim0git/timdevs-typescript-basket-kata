import React from "react";


export interface Props {
  handleSetState: (e: React.ChangeEvent<HTMLInputElement>, stockSku: string) => void,
  sku: any[]
}

const SkuForm: React.FC<Props> =  ({ handleSetState, sku: [stockSku, values] }) => {
  return (
    <div>
      <h2>SKU: {stockSku}</h2>
      <label>
        <p aria-label="offer input label">Offer, Total Price in Pence</p>
        <input
          min={0}
          onChange={(e) => handleSetState(e, stockSku)}
          type="number"
          name="offer"
          value={values.offer}
          aria-label={`${stockSku} offer input`}
          data-cy={`${stockSku} offer input`}
        />
      </label>
      <label>
        <p aria-label="minimum purchase input label">minPurchase</p>
        <input
          min="1"
          onChange={(e) => handleSetState(e, stockSku)}
          type="number"
          name="minPurchase"
          value={values.minPurchase}
          aria-label={`${stockSku} minimum purchase input`}
          data-cy={`${stockSku} minimum purchase input`}
        />
      </label>
    </div>
  );
}

export default SkuForm

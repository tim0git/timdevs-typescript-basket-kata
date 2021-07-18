import { fireEvent, render, screen } from '@testing-library/react';
import { base_price_list } from '../../resources/base_price_list';
import PricingForm from './PricingForm';

const defaultProps = {
  setCatalogue: jest.fn(),
  setPriceLoaded: jest.fn(),
  catalogue: base_price_list
}

describe('<PricingForm>- Render', () => {
    const basePriceListKeys = Object.keys(base_price_list)
    test('renders a heading for each SKU input', () => {
        render(<PricingForm {...defaultProps} />);
        const headerText = screen.getAllByRole('heading');
        headerText.forEach((text, index) => {
            expect(text).toHaveTextContent(`SKU: ${basePriceListKeys[index]}`);
        })
    })
    test('renders an Offer, Total Price in Pence Label for each SKU', () => {
        render(<PricingForm {...defaultProps} />);
        const offerTotalPriceLabel = screen.getAllByLabelText('offer input label');
        offerTotalPriceLabel.forEach((text) => {
            expect(text).toHaveTextContent('Offer, Total Price in Pence');
        })
        expect(offerTotalPriceLabel).toHaveLength(basePriceListKeys.length)
    })
    test('renders an minPurchase label for each SKU', () => {
        render(<PricingForm {...defaultProps} />);
        const offerMinPurchaseLabel = screen.getAllByLabelText('minimum purchase input label');
        offerMinPurchaseLabel.forEach((text) => {
            expect(text).toHaveTextContent('minPurchase');
        })
        expect(offerMinPurchaseLabel).toHaveLength(basePriceListKeys.length)
    })
        test('renders a Submit button', () => {
        render(<PricingForm {...defaultProps}/>);
        const resetButton = screen.getByRole('button');
        expect(resetButton).toHaveTextContent('Submit');
    });
})

describe('<PricingForm>- Methods', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    test('When submit is pressed setPriceLoaded and setCatalogue are called once', () => {
        render(<PricingForm {...defaultProps}/>);
        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton)
        expect(defaultProps.setCatalogue).toHaveBeenCalledTimes(1)
        expect(defaultProps.setPriceLoaded).toHaveBeenCalledTimes(1)
    });
})


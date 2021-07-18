import { fireEvent, render, screen } from '@testing-library/react';
import { base_price_list } from '../../resources/base_price_list';
import StoreList from './StoreList';

const defaultProps = {
  addToBasket: jest.fn(),
  catalogue: base_price_list
}

describe('<StoreList>- Render', () => {
    const basePriceListKeys = Object.keys(base_price_list)
    test('should render a header for each sku', () => {
        render(<StoreList {...defaultProps}/>);
        const headers = screen.getAllByRole('heading');
        expect(headers).toHaveLength(basePriceListKeys.length)
    })
    test('should render the header text \'Stock Name: <SKU>\' for each sku', () => {
        render(<StoreList {...defaultProps}/>);
        const headers = screen.getAllByRole('heading');
        headers.forEach((header, index) => {
            expect(header).toHaveTextContent(`Stock Name: ${basePriceListKeys[index]}`);
        })
    }) 
})

describe('<StoreList>- Methods', () => {
    test('should add item to basket when the add item button is clicked', () => {
        render(<StoreList {...defaultProps}/>);
        const addAtoBasket = screen.getByLabelText('add A to basket');
        fireEvent.click(addAtoBasket)
        expect(defaultProps.addToBasket).toHaveBeenCalledTimes(1)
    })
})
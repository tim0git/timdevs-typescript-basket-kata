import { fireEvent, render, screen } from '@testing-library/react';
import Basket from './Basket';
import { base_price_list } from '../../resources/base_price_list';

const defaultProps = {
  basket: {},
  stock: base_price_list,
  resetPricing: jest.fn(),
}

describe('<Basket>- Render', () => {
    test('renders Basket as a header', () => {
        render(<Basket {...defaultProps}/>);
        const headerText = screen.getByRole('heading');
        expect(headerText).toHaveTextContent('Basket');
    });
    test('renders £0.00 when basket is empty', () => {
        render(<Basket {...defaultProps}/>);
        const basketTotal = screen.getByLabelText('basket total in GBP');
        expect(basketTotal).toHaveTextContent('Total cost of goods: £0.00');
    });
    test('renders the SKU of an item in the basket', () => {
        const mockBasket = {
            A: 1
        }
        render(<Basket {...defaultProps} basket={ mockBasket}/>);
        const basketItem = screen.getByLabelText('basket item');
        expect(basketItem).toHaveTextContent('A');
    });
    test('renders the count an item in the basket', () => {
        const mockBasket = {
            A: 99
        }
        render(<Basket {...defaultProps} basket={ mockBasket}/>);
        const basketItemCount = screen.getByLabelText('basket item count');
        expect(basketItemCount).toHaveTextContent('99');
    });
    test('renders the basket total', () => {
        const mockBasket = {
            A: 1
        }
        render(<Basket {...defaultProps} basket={ mockBasket}/>);
        const basketTotal = screen.getByLabelText('basket total in GBP');
        expect(basketTotal).toHaveTextContent('Total cost of goods: £0.30');
    });
    test('renders a CheckOut button', () => {
        render(<Basket {...defaultProps}/>);
        const resetButton = screen.getByRole('button');
        expect(resetButton).toHaveTextContent('CheckOut');
    });
})

describe('<Basket>- Methods', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    test('resetPricing is called when Checkout Button is clicked', () => {
        render(<Basket {...defaultProps}/>);
        const resetButton = screen.getByRole('button');
        fireEvent.click(resetButton)
        expect(defaultProps.resetPricing).toHaveBeenCalledTimes(1)
    });
})

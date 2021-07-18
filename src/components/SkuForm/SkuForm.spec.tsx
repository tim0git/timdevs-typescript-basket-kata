import { fireEvent, render, screen } from '@testing-library/react';
import SkuForm from './SkuForm';

const defaultProps = {
    handleSetState: jest.fn(),
    sku:['A', {price: 30, offer: 45, minPurchase: 2}]
}

describe('<SkuForm>- Render', () => {
    test('renders the stock keeping unit as a header', () => {
        render(<SkuForm {...defaultProps}/>);
        const headerText = screen.getByRole('heading');
        expect(headerText).toHaveTextContent('SKU: A');
    });
    test('renders one offer label text', () => {
        render(<SkuForm {...defaultProps}/>);
        const offerLabelText = screen.getAllByText('Offer, Total Price in Pence');      
        expect(offerLabelText).toHaveLength(1)
    });
    test('renders one minPurchase label text', () => {
        render(<SkuForm {...defaultProps}/>);
        const minPurchaseLabelText = screen.getAllByText('minPurchase');      
        expect(minPurchaseLabelText).toHaveLength(1)
    });
})

describe('<SkuForm>- Validation', () => {
    test('offer input has a type of number', () => {
        render(<SkuForm {...defaultProps} />);
        const  offerInput = screen.getByLabelText('A offer input');
        expect(offerInput).toHaveProperty('type', 'number')
    });
    test('minimum purchase input has a type of number', () => {
        render(<SkuForm {...defaultProps}/>);
        const  minimumPurchaseInput = screen.getByLabelText('A minimum purchase input');
        expect(minimumPurchaseInput).toHaveProperty('type', 'number')
    });
    test('offer input has a min of 1', () => {
        render(<SkuForm {...defaultProps}/>);
        const  offerInput = screen.getByLabelText('A offer input');
        expect(offerInput).toHaveProperty('min', '0')
    });
    test('minimum purchase input has a min of 0', () => {
        render(<SkuForm {...defaultProps}/>);
        const  minimumPurchaseInput = screen.getByLabelText('A minimum purchase input');
        expect(minimumPurchaseInput).toHaveProperty('min', '1')
    });
})

describe('<SkuForm>- Methods', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    test('When an onchange event occurs for offer input handleSetState is called', () => {
        render(<SkuForm {...defaultProps}/>);
        const  offerInput = screen.getByLabelText('A offer input');
        fireEvent.change(offerInput, { target: { value: '999' } })
        expect(defaultProps.handleSetState).toHaveBeenCalledTimes(1)
    });
    test('When an onchange event occurs for minimum purchase input handleSetState is called', () => {
        render(<SkuForm {...defaultProps}/>);
        const  minimumPurchaseInput = screen.getByLabelText('A minimum purchase input');
        fireEvent.change(minimumPurchaseInput, { target: { value: '999' } })
        expect(defaultProps.handleSetState).toHaveBeenCalledTimes(1)
    });
})

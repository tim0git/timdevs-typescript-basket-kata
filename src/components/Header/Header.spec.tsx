import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('<Header>- Render', () => {
  test('renders a header with the content: CDL react-kata challenge', () => {
    render(<Header />);
    const headerText = screen.getByRole('heading');
    expect(headerText).toHaveTextContent('CDL react-kata challenge');
  })
})
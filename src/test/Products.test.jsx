import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Products from '../pages/Products';
import API from '../services/api';

jest.mock('../services/api');

const mockProducts = [
  { id: '1', name: 'Bread', price: 80, quantity: 10, image: 'bread.jpg' },
  { id: '2', name: 'Milk', price: 50, quantity: 5, image: 'milk.jpg' }
];

describe('Products', () => {
  beforeEach(() => {
    API.get.mockResolvedValue({ data: mockProducts });
    API.patch.mockResolvedValue({ data: {} });
  });

  test('fetches and displays products', async () => {
    render(<Products />);

    await waitFor(() => {
      expect(screen.getByText('Bread')).toBeInTheDocument();
      expect(screen.getByText('Milk')).toBeInTheDocument();
    });
  });

  test('filters products based on search', async () => {
    render(<Products />);

    await waitFor(() => screen.getByText('Bread'));

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'Bread' } });

    expect(screen.getByText('Bread')).toBeInTheDocument();
    expect(screen.queryByText('Milk')).not.toBeInTheDocument();
  });

  test('adds product to cart', async () => {
    render(<Products />);

    await waitFor(() => screen.getByText('Bread'));

    const addButton = screen.getAllByText('Add to Cart')[0];
    fireEvent.click(addButton);

    // Check that Bread appears in the cart
    const cartSection = screen.getByText('Cart').closest('div');
    expect(cartSection).toHaveTextContent('Bread');
    expect(cartSection).toHaveTextContent('Quantity: 1');
    expect(cartSection).toHaveTextContent('Price: Ksh 80');
  });

  test('removes item from cart and restores stock', async () => {
    render(<Products />);

    await waitFor(() => screen.getByText('Bread'));

    const addButton = screen.getAllByText('Add to Cart')[0];
    fireEvent.click(addButton);

    const removeButton = await screen.findByText('Remove');
    fireEvent.click(removeButton);

    expect(screen.queryByText('Quantity: 1')).not.toBeInTheDocument();
    expect(screen.getByText('10 Left')).toBeInTheDocument();
  });
});
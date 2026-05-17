import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Products from '../pages/Products';
import API from '../services/api';

jest.mock('../services/api');

// Explicit mock data layout mirroring your database schema
const mockProducts = [
  { id: '1', name: 'Bread', price: 80, quantity: 10, image: 'bread.jpg' },
  { id: '2', name: 'Milk', price: 50, quantity: 5, image: 'milk.jpg' }
];

describe('Products', () => {
  beforeEach(() => {
    // 1. Intercept Vite's import.meta.env check inside Jest
    globalThis['import'] = { meta: { env: { DEV: true } } };

    // 2. Clear and set mock response resolutions
    API.get.mockResolvedValue({ data: mockProducts });
    API.patch.mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    // Clean up mutations assigned to global layout
    delete globalThis['import'];
    jest.clearAllMocks();
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

    const cartSection = screen.getByText('Cart').closest('div');
    expect(cartSection).toHaveTextContent('Bread');
    expect(cartSection).toHaveTextContent('Quantity: 1');
    expect(cartSection).toHaveTextContent('Price: Ksh 80');
  });

  test('removes item from cart and restores stock', async () => {
    render(<Products />);

    await waitFor(() => screen.getByText('Bread'));

    // Add item to cart
    const addButton = screen.getAllByText('Add to Cart')[0];
    fireEvent.click(addButton);

    // Click remove button inside the cart summary block
    const removeButton = await screen.findByText('Remove');
    fireEvent.click(removeButton);

    // Verify cart updates immediately
    expect(screen.queryByText('Quantity: 1')).not.toBeInTheDocument();
    
    // Loose node match verifying stock count returns safely back to 10
    expect(screen.getByText(/10\s*Items/i)).toBeInTheDocument();
  });
});
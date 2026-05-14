import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: '1',
  name: 'Bread',
  price: 80,
  quantity: 10,
  image: 'bread.jpg'
};

const mockAddToCart = jest.fn();

describe('ProductCard', () => {
  test('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);

    expect(screen.getByText('Bread')).toBeInTheDocument();
    expect(screen.getByText('Price: Ksh 80')).toBeInTheDocument();
    expect(screen.getByText('In stock: 10')).toBeInTheDocument();
    expect(screen.getByAltText('Bread')).toBeInTheDocument();
  });

  test('calls addToCart when button is clicked', () => {
    render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);

    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('disables button when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, quantity: 0 };
    render(<ProductCard product={outOfStockProduct} addToCart={mockAddToCart} />);

    const button = screen.getByText('Out of Stock');
    expect(button).toBeDisabled();
  });
});
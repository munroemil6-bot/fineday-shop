import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../components/Cart';

const mockCart = [
  { id: '1', name: 'Bread', price: 80, cartQuantity: 2 },
  { id: '2', name: 'Milk', price: 50, cartQuantity: 1 }
];

const mockHandleBuy = jest.fn();
const mockRemoveFromCart = jest.fn();

describe('Cart', () => {
  test('renders cart items and total', () => {
    render(
      <Cart
        cart={mockCart}
        handleBuy={mockHandleBuy}
        removeFromCart={mockRemoveFromCart}
      />
    );

    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Bread')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Price: Ksh 80')).toBeInTheDocument();
    expect(screen.getByText('Subtotal: Ksh 160')).toBeInTheDocument();
    expect(screen.getByText('Milk')).toBeInTheDocument();
    expect(screen.getByText('Total: Ksh 210')).toBeInTheDocument();
  });

  test('calls removeFromCart when Remove is clicked', () => {
    render(
      <Cart
        cart={mockCart}
        handleBuy={mockHandleBuy}
        removeFromCart={mockRemoveFromCart}
      />
    );

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
  });

  test('shows empty cart message when no items', () => {
    render(<Cart cart={[]} handleBuy={mockHandleBuy} />);

    expect(screen.getByText('No items in cart')).toBeInTheDocument();
  });

  test('calls handleBuy when Buy Now is clicked', () => {
    render(<Cart cart={mockCart} handleBuy={mockHandleBuy} />);

    const button = screen.getByText('Buy Now');
    fireEvent.click(button);

    expect(mockHandleBuy).toHaveBeenCalled();
  });
});
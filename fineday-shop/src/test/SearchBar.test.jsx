import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  test('renders input and handles change', () => {
    const mockSetSearch = jest.fn();
    render(<SearchBar search="" setSearch={mockSetSearch} />);

    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockSetSearch).toHaveBeenCalledWith('test');
  });
});
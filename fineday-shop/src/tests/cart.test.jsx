import {
  render,
  screen
} from "@testing-library/react";

import Cart from "../components/Cart";

test(
  "renders cart total",
  () => {

    const cart = [
      {
        name: "Bread",
        price: 80
      }
    ];

    render(<Cart cart={cart} />);

    expect(
      screen.getByText(/Total/i)
    ).toBeInTheDocument();
  }
);
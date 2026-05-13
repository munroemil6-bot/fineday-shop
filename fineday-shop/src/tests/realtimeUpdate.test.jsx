import {
  render,
  screen
} from "@testing-library/react";

import ProductCard from "../components/ProductCard";

test(
  "renders product quantity",
  () => {
    const product = {
      id: 1,
      name: "Bread",
      price: 80,
      quantity: 10,
      image: ""
    };

    render(
      <ProductCard
        product={product}
        addToCart={() => {}}
      />
    );

    expect(
      screen.getByText(/Available/i)
    ).toBeInTheDocument();
  }
);
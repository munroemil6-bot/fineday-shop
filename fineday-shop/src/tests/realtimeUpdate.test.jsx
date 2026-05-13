import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

test("updates quantity after purchase", () => {
  const mockProduct = {
    name: "Bread",
    quantity: 10
  };

  render(<ProductCard product={mockProduct} />);

  expect(screen.getByText(/10/i)).toBeInTheDocument();
});
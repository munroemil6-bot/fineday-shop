import {
  render,
  screen
} from "@testing-library/react";

import SearchBar from "../components/SearchBar";

test(
  "renders search input",
  () => {

    render(
      <SearchBar
        search=""
        setSearch={() => {}}
      />
    );

    expect(
      screen.getByPlaceholderText(
        /Search products/i
      )
    ).toBeInTheDocument();
  }
);
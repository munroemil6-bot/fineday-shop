import axios from "axios";

test(
  "fetches products from json server",
  async () => {
    const response = await axios.get(
      "http://localhost:3001/products"
    );

    expect(response.data.length)
      .toBeGreaterThan(0);
  }
);
import { useState, useEffect } from "react";
import axios from "axios";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const priceRanges = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 = $200", min: 100, max: 200 },
    { label: "Above $200", min: 200, max: Infinity },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handlePriceRangeSelect = (range) => {
    setSelectedPriceRange(range);
    filterProductsByPrice(range);
  };

  const filterProductsByPrice = (range) => {
    if (!range) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) => {
      return product.price >= range.min && product.price < range.max;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar for Price Filters */}
      <div
        style={{ width: "20%", padding: "1rem", borderRight: "1px solid #ddd" }}
      >
        <h2>Filter by Price</h2>
        {priceRanges.map((range, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                name="price"
                value={range.label}
                checked={selectedPriceRange?.label === range.label}
                onChange={() => handlePriceRangeSelect(range)}
              />
              {range.label}
            </label>
          </div>
        ))}
        <button onClick={() => handlePriceRangeSelect(null)}>
          Reset Filter
        </button>
      </div>

      {/* Product Display Section */}
      <div style={{ width: "80%", padding: "1rem" }}>
        <h1>Products</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                width: "calc(25% - 1rem)",
              }}
            >
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

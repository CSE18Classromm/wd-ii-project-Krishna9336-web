// App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const products = [
    {
      id: 1,
      name: "iPhone 15",
      price: 79999,
      image:
        "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 69999,
      image:
        "https://m.media-amazon.com/images/I/71RXh4jNa6L._SX679_.jpg",
    },
    {
      id: 3,
      name: "HP Laptop",
      price: 55999,
      image:
        "https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg",
    },
    {
      id: 4,
      name: "Boat Headphones",
      price: 2999,
      image:
        "https://m.media-amazon.com/images/I/61u1VALn6JL._SX679_.jpg",
    },
  ];

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Add to Wishlist
  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };

  // Search Filter
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Amazon Clone</h1>

        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="nav-items">
          <p>🛒 Cart ({cart.length})</p>
          <p>❤️ Wishlist ({wishlist.length})</p>
        </div>
      </nav>

      {/* Products */}
      <div className="products-container">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h2>{product.name}</h2>

            <p className="price">₹ {product.price}</p>

            <div className="buttons">
              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>

              <button
                className="wishlist-btn"
                onClick={() => addToWishlist(product)}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="details-section">
        <div className="cart-section">
          <h2>Cart Items</h2>

          {cart.map((item, index) => (
            <p key={index}>
              {item.name} - ₹ {item.price}
            </p>
          ))}
        </div>

        {/* Wishlist Section */}
        <div className="wishlist-section">
          <h2>Wishlist Items</h2>

          {wishlist.map((item, index) => (
            <p key={index}>
              {item.name} - ₹ {item.price}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
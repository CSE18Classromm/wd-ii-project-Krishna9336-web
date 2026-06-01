// App.js
import React, { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "iPhone 15", price: 79999, category: "Phones", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400" },
  { id: 2, name: "Samsung Galaxy S24", price: 69999, category: "Phones", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400" },
  { id: 3, name: "OnePlus 12", price: 58999, category: "Phones", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400" },
  { id: 4, name: "iPad Air", price: 54999, category: "Tablets", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400" },
  { id: 5, name: "Samsung Tablet", price: 35999, category: "Tablets", image: "https://images.unsplash.com/photo-1589739900243-4b52cd9dd4d4?w=400" },
  { id: 6, name: "Boat Headphones", price: 2999, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 7, name: "AirPods Pro", price: 24999, category: "Audio", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400" },
  { id: 8, name: "Noise Smartwatch", price: 4999, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: 9, name: "HP Laptop", price: 55999, category: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
  { id: 10, name: "Canon Camera", price: 45999, category: "Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" },
  { id: 11, name: "JBL Speaker", price: 6999, category: "Audio", image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400" },
  { id: 12, name: "Gaming Keyboard", price: 2499, category: "Gaming", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400" },
  { id: 13, name: "Gaming Mouse", price: 1499, category: "Gaming", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400" },
  { id: 14, name: "LG Monitor", price: 12999, category: "Monitors", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
  { id: 15, name: "PlayStation 5", price: 54999, category: "Gaming", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400" },
];

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState("products"); // "products" | "cart" | "wishlist"
  const [notification, setNotification] = useState(null);
  const [location, setLocation] = useState("Ghaziabad");

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    showNotification(`🛒 ${product.name} added to cart!`);
  };

  const addToWishlist = (product) => {
    if (wishlist.find((item) => item.id === product.id)) {
      showNotification(`Already in wishlist!`);
      return;
    }
    setWishlist([...wishlist, product]);
    showNotification(`❤️ ${product.name} wishlisted!`);
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const removeFromWishlist = (id) => setWishlist(wishlist.filter((item) => item.id !== id));

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);
  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <div className="app">
      {/* Notification Toast */}
      {notification && <div className="toast">{notification}</div>}

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="logo">🛍 ShopClone</h1>
          <div className="location">
            <span className="location-icon">📍</span>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Ghaziabad</option>
              <option>Noida</option>
            </select>
          </div>
        </div>

        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-search" onClick={() => setSearch("")}>✕</button>
          )}
        </div>

        <div className="nav-actions">
          <button
            className={`nav-btn ${activeTab === "cart" ? "active" : ""}`}
            onClick={() => setActiveTab(activeTab === "cart" ? "products" : "cart")}
          >
            🛒 Cart
            {cart.length > 0 && <span className="badge">{cart.reduce((s, i) => s + i.qty, 0)}</span>}
          </button>
          <button
            className={`nav-btn ${activeTab === "wishlist" ? "active" : ""}`}
            onClick={() => setActiveTab(activeTab === "wishlist" ? "products" : "wishlist")}
          >
            ❤️ Wishlist
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        {/* Product Grid */}
        {activeTab === "products" && (
          <>
            <div className="results-info">
              <span>{filteredProducts.length} products{search ? ` for "${search}"` : ""}</span>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <p>😕 No products found for "<strong>{search}</strong>"</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <div className="product-card" key={product.id}>
                    <div className="product-img-wrap">
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span className="category-tag">{product.category}</span>
                      <button
                        className={`wishlist-icon-btn ${isInWishlist(product.id) ? "wishlisted" : ""}`}
                        onClick={() => addToWishlist(product)}
                        title="Add to Wishlist"
                      >
                        {isInWishlist(product.id) ? "❤️" : "🤍"}
                      </button>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>
                      <p className="product-rating">⭐⭐⭐⭐ <span>(4.2)</span></p>
                      <button
                        className={`add-cart-btn ${isInCart(product.id) ? "in-cart" : ""}`}
                        onClick={() => addToCart(product)}
                      >
                        {isInCart(product.id) ? "✓ Add More" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Cart Panel */}
        {activeTab === "cart" && (
          <div className="side-panel">
            <h2 className="panel-title">🛒 Your Cart ({cart.reduce((s, i) => s + i.qty, 0)} items)</h2>
            {cart.length === 0 ? (
              <div className="empty-state">
                <p>Your cart is empty.</p>
                <button className="back-btn" onClick={() => setActiveTab("products")}>Browse Products</button>
              </div>
            ) : (
              <>
                <div className="panel-items">
                  {cart.map((item) => (
                    <div className="panel-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="panel-item-info">
                        <p className="panel-item-name">{item.name}</p>
                        <p className="panel-item-price">₹{item.price.toLocaleString("en-IN")} × {item.qty}</p>
                        <p className="panel-item-subtotal">= ₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout →</button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Wishlist Panel */}
        {activeTab === "wishlist" && (
          <div className="side-panel">
            <h2 className="panel-title">❤️ Wishlist ({wishlist.length} items)</h2>
            {wishlist.length === 0 ? (
              <div className="empty-state">
                <p>Your wishlist is empty.</p>
                <button className="back-btn" onClick={() => setActiveTab("products")}>Browse Products</button>
              </div>
            ) : (
              <div className="panel-items">
                {wishlist.map((item) => (
                  <div className="panel-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="panel-item-info">
                      <p className="panel-item-name">{item.name}</p>
                      <p className="panel-item-price">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="panel-item-actions">
                      <button className="move-to-cart-btn" onClick={() => { addToCart(item); removeFromWishlist(item.id); }}>Move to Cart</button>
                      <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route
              path="/search"
              element={
                <div className="container px-4 py-8">
                  <h1 className="text-3xl font-bold">
                    Search Page - Coming Soon
                  </h1>
                </div>
              }
            />

            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route
              path="*"
              element={
                <div className="container px-4 py-8 text-center">
                  <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
}

export default App;

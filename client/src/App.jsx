import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products"
            element={
              <div className="container px-4 py-8">
                <h1 className="text-3xl font-bold">
                  Products Page - Coming Soon
                </h1>
              </div>
            }
          />
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
          <Route
            path="/category/:category"
            element={
              <div className="container px-4 py-8">
                <h1 className="text-3xl font-bold">
                  Category Page - Coming Soon
                </h1>
              </div>
            }
          />
          <Route
            path="/product/:id"
            element={
              <div className="container px-4 py-8">
                <h1 className="text-3xl font-bold">
                  Product Details - Coming Soon
                </h1>
              </div>
            }
          />
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
    </Router>
  );
}

export default App;

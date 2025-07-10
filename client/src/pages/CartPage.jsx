import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    cartCount,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartGrandTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="relative min-h-screen">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl float opacity-60"></div>
          <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl float-delayed opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-8 glass-stronger rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
              <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
              <ShoppingBag className="relative h-16 w-16 text-slate-400 drop-shadow-lg" />
            </div>

            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              to="/products"
              className="group inline-flex items-center space-x-3 glass-stronger hover:glass border border-white/30 px-8 py-4 rounded-2xl text-lg font-semibold text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl float opacity-60"></div>
        <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl float-delayed opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-green-400/5 rounded-full blur-3xl float opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="group inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-300 mb-4"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Continue Shopping</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
            Shopping Cart
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="glass-stronger rounded-2xl border border-white/30 shadow-xl p-6 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={
                        item.image ||
                        `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop`
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop`;
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">
                      {item.name}
                    </h3>
                    {item.category && (
                      <p className="text-sm text-slate-600 mb-2">
                        {item.category}
                      </p>
                    )}
                    <p className="text-xl font-bold text-blue-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="w-10 h-10 glass hover:glass-stronger rounded-xl border border-white/30 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="w-12 text-center font-semibold text-slate-900">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="w-10 h-10 glass hover:glass-stronger rounded-xl border border-white/30 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-10 h-10 glass hover:glass-stronger rounded-xl border border-white/30 flex items-center justify-center text-red-500 hover:text-red-600 transition-all duration-300 group"
                  >
                    <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-stronger rounded-2xl border border-white/30 shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 drop-shadow-sm">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>${cartTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>
                    {cartShipping === 0
                      ? "FREE"
                      : `$${cartShipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-white/30 pt-4">
                  <div className="flex justify-between text-xl font-bold text-slate-900">
                    <span>Total</span>
                    <span>${cartGrandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {cartShipping > 0 && (
                <div className="mb-6 p-4 glass rounded-xl border border-blue-200/50 bg-blue-50/20">
                  <div className="flex items-center space-x-2 text-blue-600 text-sm">
                    <Truck className="h-4 w-4" />
                    <span>
                      Add ${(50 - cartSubtotal).toFixed(2)} more for FREE
                      shipping!
                    </span>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full group relative px-6 py-4 text-lg font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl overflow-hidden mb-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md group-hover:from-blue-600/90 group-hover:to-purple-600/90 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <CreditCard className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  </span>
                </div>
              </button>

              {/* Security Notice */}
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <Shield className="h-4 w-4" />
                <span>Secure checkout guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

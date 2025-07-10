import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import apiService from "../services/api";
import {
  ArrowLeft,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  Truck,
  MapPin,
} from "lucide-react";

export default function CheckoutPage() {
  const {
    items,
    cartCount,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartGrandTotal,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required";
    if (!formData.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate.trim())
      newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    if (!formData.nameOnCard.trim())
      newErrors.nameOnCard = "Name on card is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create order object
      const orderData = {
        product_list: items.map((item) => ({
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category,
        })),
        shipping_address: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
        payment_method: "credit_card",
        subtotal: cartSubtotal,
        tax: cartTax,
        shipping: cartShipping,
        total: cartGrandTotal,
      };

      // Submit order to API
      const response = await apiService.createOrder(orderData);

      if (response.success) {
        setOrderNumber(response.order.order_id);
        setOrderCompleted(true);
        clearCart();
      } else {
        throw new Error(response.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setErrors({ submit: "Failed to place order. Please try again." });
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirect to cart if empty
  if (items.length === 0 && !orderCompleted) {
    navigate("/cart");
    return null;
  }

  // Order Confirmation Page
  if (orderCompleted) {
    return (
      <div className="relative min-h-screen">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-green-400/5 rounded-full blur-3xl float opacity-60"></div>
          <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl float-delayed opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-8 glass-stronger rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
              <div className="absolute inset-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl"></div>
              <CheckCircle className="relative h-16 w-16 text-green-600 drop-shadow-lg" />
            </div>

            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm">
              Order Confirmed!
            </h1>
            <p className="text-xl text-slate-600 mb-2 leading-relaxed">
              Thank you for your order. Your order number is:
            </p>
            <p className="text-2xl font-bold text-slate-900 mb-8">
              {orderNumber}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/orders"
                className="group inline-flex items-center space-x-3 glass-stronger hover:glass border border-white/30 px-8 py-4 rounded-2xl text-lg font-semibold text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>View Order History</span>
              </Link>
              <Link
                to="/products"
                className="group inline-flex items-center space-x-3 glass-stronger hover:glass border border-white/30 px-8 py-4 rounded-2xl text-lg font-semibold text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
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
            to="/cart"
            className="group inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-300 mb-4"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Cart</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
            Checkout
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Complete your order
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <div className="glass-stronger rounded-2xl border border-white/30 shadow-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 glass rounded-2xl flex items-center justify-center border border-white/30">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass rounded-xl border ${
                        errors.name ? "border-red-300" : "border-white/30"
                      } text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass rounded-xl border ${
                        errors.address ? "border-red-300" : "border-white/30"
                      } text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300`}
                      placeholder="Enter your street address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.address}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass rounded-xl border ${
                        errors.city ? "border-red-300" : "border-white/30"
                      } text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass rounded-xl border ${
                        errors.state ? "border-red-300" : "border-white/30"
                      } text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300`}
                      placeholder="Enter state"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.state}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass rounded-xl border ${
                        errors.zip ? "border-red-300" : "border-white/30"
                      } text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300`}
                      placeholder="Enter ZIP code"
                    />
                    {errors.zip && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.zip}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="glass-stronger rounded-2xl border border-white/30 shadow-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 glass rounded-2xl flex items-center justify-center border border-white/30">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Payment Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass rounded-xl border ${
                        errors.cardNumber ? "border-red-300" : "border-white/30"
                      } text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.cardNumber}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass rounded-xl border ${
                        errors.expiryDate ? "border-red-300" : "border-white/30"
                      } text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300`}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.expiryDate}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass rounded-xl border ${
                        errors.cvv ? "border-red-300" : "border-white/30"
                      } text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300`}
                      placeholder="123"
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.cvv}</span>
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass rounded-xl border ${
                        errors.nameOnCard ? "border-red-300" : "border-white/30"
                      } text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300`}
                      placeholder="Enter name as it appears on card"
                    />
                    {errors.nameOnCard && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.nameOnCard}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-stronger rounded-2xl border border-white/30 shadow-xl p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 drop-shadow-sm">
                  Order Summary
                </h2>

                {/* Items List */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={
                            item.image ||
                            `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop`
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

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

                {/* Submit Error */}
                {errors.submit && (
                  <div className="mb-6 p-4 glass rounded-xl border border-red-200/50 bg-red-50/20">
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.submit}</span>
                    </div>
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full group relative px-6 py-4 text-lg font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl overflow-hidden mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md group-hover:from-blue-600/90 group-hover:to-purple-600/90 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                        <span>Place Order</span>
                      </>
                    )}
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
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/api";
import { Package, ArrowLeft, Calendar, CreditCard, MapPin } from "lucide-react";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await apiService.getOrders();
        setOrders(
          ordersData.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
        );
      } catch (err) {
        console.error("Failed to load orders:", err);
        setError("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl float opacity-60"></div>
          <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl float-delayed opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-slate-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-red-400/5 rounded-full blur-3xl float opacity-60"></div>
          <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl float-delayed opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
              Error Loading Orders
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {error}
            </p>
            <Link
              to="/products"
              className="group inline-flex items-center space-x-3 glass-stronger hover:glass border border-white/30 px-8 py-4 rounded-2xl text-lg font-semibold text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
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
              <Package className="relative h-16 w-16 text-slate-400 drop-shadow-lg" />
            </div>

            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
              No Orders Yet
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              You haven't placed any orders yet. Start shopping to see your
              order history here.
            </p>

            <Link
              to="/products"
              className="group inline-flex items-center space-x-3 glass-stronger hover:glass border border-white/30 px-8 py-4 rounded-2xl text-lg font-semibold text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Start Shopping</span>
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
            Order History
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Track and manage your past orders
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="glass-stronger rounded-2xl border border-white/30 shadow-xl p-6 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Order Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/30">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Order #{order.id}
                    </h3>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(order.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-600">Total</p>
                  <p className="text-xl font-bold text-slate-900">
                    ${order.total?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Items */}
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">
                    Items Ordered
                  </h4>
                  <div className="space-y-3">
                    {order.product_list?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-3 glass rounded-xl border border-white/20"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                          <img
                            src={
                              item.image ||
                              `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop`
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop`;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-slate-900 truncate">
                            {item.name}
                          </h5>
                          <p className="text-sm text-slate-600">
                            Qty: {item.quantity} × $
                            {item.price?.toFixed(2) || "0.00"}
                          </p>
                          {item.category && (
                            <p className="text-xs text-slate-500">
                              {item.category}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">
                            $
                            {((item.price || 0) * (item.quantity || 1)).toFixed(
                              2
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Info */}
                <div className="space-y-6">
                  {/* Shipping Address */}
                  {order.shipping_address && (
                    <div className="glass rounded-xl border border-white/20 p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <h5 className="font-semibold text-slate-900">
                          Shipping Address
                        </h5>
                      </div>
                      <div className="text-sm text-slate-600 space-y-1">
                        <p>{order.shipping_address.name}</p>
                        <p>{order.shipping_address.address}</p>
                        <p>
                          {order.shipping_address.city},{" "}
                          {order.shipping_address.state}{" "}
                          {order.shipping_address.zip}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Payment Method */}
                  <div className="glass rounded-xl border border-white/20 p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <h5 className="font-semibold text-slate-900">Payment</h5>
                    </div>
                    <p className="text-sm text-slate-600 capitalize">
                      {order.payment_method?.replace("_", " ") || "Credit Card"}
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div className="glass rounded-xl border border-white/20 p-4">
                    <h5 className="font-semibold text-slate-900 mb-3">
                      Order Summary
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span>${order.subtotal?.toFixed(2) || "0.00"}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Tax</span>
                        <span>${order.tax?.toFixed(2) || "0.00"}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span>
                          {(order.shipping || 0) === 0
                            ? "FREE"
                            : `$${order.shipping?.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="border-t border-white/20 pt-2">
                        <div className="flex justify-between font-semibold text-slate-900">
                          <span>Total</span>
                          <span>${order.total?.toFixed(2) || "0.00"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  ShoppingBag,
  Truck,
  Shield,
  CreditCard,
  Headphones,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ProductGrid from "../components/product/ProductGrid";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: 299.99,
          originalPrice: 399.99,
          rating: 4.8,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
          onSale: true,
          stock: 15,
        },
        {
          id: 2,
          name: "Smart Fitness Watch",
          price: 249.99,
          rating: 4.6,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
          stock: 8,
        },
        {
          id: 3,
          name: "Minimalist Desk Lamp",
          price: 89.99,
          originalPrice: 129.99,
          rating: 4.7,
          category: "Home & Garden",
          image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
          onSale: true,
          stock: 12,
        },
        {
          id: 4,
          name: "Organic Cotton T-Shirt",
          price: 34.99,
          rating: 4.5,
          category: "Clothing",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
          stock: 25,
        },
        {
          id: 5,
          name: "Professional Camera Lens",
          price: 899.99,
          rating: 4.9,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop",
          stock: 3,
        },
        {
          id: 6,
          name: "Yoga Exercise Mat",
          price: 49.99,
          originalPrice: 69.99,
          rating: 4.4,
          category: "Sports",
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
          onSale: true,
          stock: 18,
        },
        {
          id: 7,
          name: "Artisan Coffee Mug Set",
          price: 59.99,
          rating: 4.6,
          category: "Home & Garden",
          image:
            "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop",
          stock: 14,
        },
        {
          id: 8,
          name: "Vintage Leather Backpack",
          price: 179.99,
          originalPrice: 249.99,
          rating: 4.8,
          category: "Clothing",
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
          onSale: true,
          stock: 7,
        },
      ]);

      setFeaturedCategories([
        {
          name: "Electronics",
          description: "Latest tech gadgets and innovations",
          image:
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
          itemCount: "1,200+ items",
          href: "/category/electronics",
        },
        {
          name: "Fashion",
          description: "Trendy clothing and accessories",
          image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
          itemCount: "2,800+ items",
          href: "/category/clothing",
        },
        {
          name: "Home & Garden",
          description: "Beautiful home decor and essentials",
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
          itemCount: "950+ items",
          href: "/category/home-garden",
        },
        {
          name: "Sports & Fitness",
          description: "Gear for active lifestyles",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
          itemCount: "650+ items",
          href: "/category/sports",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on orders over $50",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Your transactions are protected",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CreditCard,
      title: "Easy Returns",
      description: "30-day hassle-free returns",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl float opacity-60"></div>
        <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl float-delayed opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-400/5 rounded-full blur-3xl float opacity-60"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Animated background layers */}
          <div className="absolute inset-0 liquid-gradient-1 opacity-60"></div>
          <div className="absolute inset-0 liquid-gradient-2 opacity-30"></div>

          {/* Glass morphism overlay */}
          <div className="absolute inset-0 glass-subtle"></div>

          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 glass rounded-full blur-sm float opacity-40"></div>
          <div className="absolute top-40 right-20 w-24 h-24 glass-stronger rounded-full blur-sm float-delayed opacity-50"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 glass rounded-full blur-sm float opacity-40"></div>
          <div className="absolute bottom-20 right-1/3 w-16 h-16 glass-stronger rounded-full blur-sm float-delayed opacity-50"></div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Hero badge */}
              <div className="inline-flex items-center space-x-2 glass-stronger px-6 py-3 rounded-full border border-white/30 shadow-xl mb-8 group hover:scale-105 transition-all duration-300">
                <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
                <span className="text-slate-700 font-medium">
                  New arrivals every week
                </span>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent drop-shadow-2xl">
                  Discover Amazing
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
                  Products
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
                Shop millions of products with unbeatable prices.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/products"
                  className="group relative px-8 py-4 text-lg font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md group-hover:from-blue-600/90 group-hover:to-purple-600/90 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>Shop Now</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>

                <Link
                  to="/categories"
                  className="group px-8 py-4 text-lg font-semibold glass hover:glass-stronger border border-white/30 text-slate-700 hover:text-blue-600 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center space-x-3">
                    <span>Browse Categories</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Happy Customers", value: "1M+" },
                  { label: "Products", value: "50K+" },
                  { label: "Reviews", value: "4.9" },
                  { label: "Countries", value: "100+" },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="glass-stronger rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 drop-shadow-sm">
                        {stat.value}
                      </div>
                      <div className="text-slate-600 font-medium">
                        {stat.label}
                      </div>
                      {stat.label === "Reviews" && (
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="relative py-24">
          <div className="absolute inset-0 liquid-gradient-3 opacity-20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
                Shop by Category
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Explore our curated collections of premium products across
                different categories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCategories.map((category, index) => (
                <Link
                  key={index}
                  to={category.href}
                  className="group relative overflow-hidden glass-stronger rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 drop-shadow-lg group-hover:text-blue-200 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-90 mb-2 drop-shadow-sm">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium opacity-80">
                        {category.itemCount}
                      </span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 liquid-gradient-2 opacity-30"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
                Why Choose Bamazon?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative text-center glass-stronger rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 drop-shadow-sm">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="relative py-24">
          <div className="absolute inset-0 liquid-gradient-1 opacity-25"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
                Featured Products
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Discover our handpicked selection of premium products that our
                customers love most
              </p>
            </div>

            <ProductGrid products={products} loading={loading} />

            <div className="text-center mt-12">
              <Link
                to="/products"
                className="group inline-flex items-center space-x-3 glass-stronger hover:glass border border-white/30 px-8 py-4 rounded-2xl text-lg font-semibold text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>View All Products</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

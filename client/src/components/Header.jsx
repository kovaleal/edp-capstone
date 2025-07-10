import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-stronger shadow-2xl border-b border-white/30"
          : "glass shadow-xl border-b border-white/20"
      }`}
    >
      {/* Glass gradient overlay */}
      <div className="absolute inset-0 liquid-gradient-1 opacity-30"></div>

      {/* Floating orbs for decoration */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl float opacity-60"></div>
      <div className="absolute top-0 right-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl float-delayed opacity-60"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center space-x-3 liquid-ripple"
            >
              <div className="relative w-12 h-12 glass-stronger rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white/30">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300"></div>
                <span className="relative text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                  B
                </span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
                amazoN
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 relative group ${
                    location.pathname === item.path
                      ? "glass-stronger text-blue-700 shadow-lg"
                      : "text-slate-700 hover:glass hover:text-blue-600"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {location.pathname === item.path && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/30"></div>
                  )}
                  <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSubmit} className="relative w-full group">
                <div className="relative glass-stronger rounded-2xl border border-white/30 shadow-lg">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-500 rounded-2xl"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                </div>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Wishlist */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex relative p-3 glass hover:glass-stronger rounded-2xl border border-white/20 transition-all duration-300 hover:scale-105 group"
              >
                <Heart className="h-5 w-5 text-slate-700 group-hover:text-red-500 transition-colors duration-300" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg border border-white/30">
                  3
                </div>
              </Button>

              {/* User Account */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex p-3 glass hover:glass-stronger rounded-2xl border border-white/20 transition-all duration-300 hover:scale-105 group"
              >
                <User className="h-5 w-5 text-slate-700 group-hover:text-blue-500 transition-colors duration-300" />
              </Button>

              {/* Shopping Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative p-3 glass hover:glass-stronger rounded-2xl border border-white/20 transition-all duration-300 hover:scale-105 group"
              >
                <ShoppingCart className="h-5 w-5 text-slate-700 group-hover:text-green-500 transition-colors duration-300" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg border border-white/30">
                  2
                </div>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 glass hover:glass-stronger rounded-2xl border border-white/20 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-slate-700" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-700" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-stronger border-t border-white/30 shadow-2xl">
            <div className="absolute inset-0 liquid-gradient-2 opacity-20"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
              {/* Mobile Search */}
              <div className="mb-6">
                <form onSubmit={handleSubmit} className="relative group">
                  <div className="relative glass rounded-2xl border border-white/30 shadow-lg">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-500 rounded-2xl"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
                  </div>
                </form>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? "glass-stronger text-blue-700 shadow-lg border border-white/30"
                        : "text-slate-700 hover:glass hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile User Actions */}
              <div className="mt-6 flex items-center justify-center space-x-4">
                <Button className="flex-1 btn-glass text-slate-700 hover:text-blue-600 py-3 rounded-2xl">
                  <User className="h-5 w-5 mr-2" />
                  Account
                </Button>
                <Button className="flex-1 btn-glass text-slate-700 hover:text-red-600 py-3 rounded-2xl">
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

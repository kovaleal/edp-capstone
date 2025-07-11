import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "../../hooks/useCart";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/bamazon.png" alt="Bamazon Logo" className="h-8 w-8" />
            <span className="text-lg font-bold text-slate-900">Bamazon</span>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm border border-slate-200"
              />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <Link
              to="/orders"
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
              title="Order History"
            >
              <Package className="h-5 w-5" />
            </Link>

            <Link
              to="/cart"
              className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-8 w-8 p-0 text-slate-600 hover:text-slate-900"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white">
                <div className="flex flex-col space-y-4 mt-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border border-slate-200"
                    />
                  </form>

                  {/* Mobile Cart */}
                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-slate-900">
                        Shopping Cart
                      </span>
                    </div>
                    {cartCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </Link>

                  {/* Mobile Order History */}
                  <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center p-3 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-slate-900">
                        Order History
                      </span>
                    </div>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

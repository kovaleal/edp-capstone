import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Electronics", href: "/category/electronics" },
    { name: "Clothing", href: "/category/clothing" },
    { name: "Home & Garden", href: "/category/home-garden" },
    { name: "Sports", href: "/category/sports" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-slate-50/30 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        {/* Main header */}
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-7 w-7 bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors rounded">
              <img
                src="/bamazon.png"
                alt="Bamazon Logo"
                className="h-full w-full object-contain rounded-lg"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Bamazon
            </span>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50/80 backdrop-blur-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all border border-slate-200/60"
              />
            </div>
          </div>

          {/* Mobile menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden h-8 w-8 p-0 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-white/95 backdrop-blur-md border-slate-200"
            >
              <div className="flex flex-col space-y-4 mt-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border border-slate-200"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2 px-2 rounded-md hover:bg-slate-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block bg-slate-50/60 backdrop-blur-sm rounded-lg mx-4 mb-2 border border-slate-200/40">
          <nav className="flex items-center justify-center space-x-6 px-4 py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

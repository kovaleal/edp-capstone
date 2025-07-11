import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-50 mt-8 border-t border-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-slate-900">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Products
              </Link>
              <Link
                to="/#categories"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  if (window.location.pathname === "/") {
                    e.preventDefault();
                    document.getElementById("categories")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-slate-900">
              Customer Service
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/contact"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/help"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Help Center
              </Link>
              <Link
                to="/returns"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Returns
              </Link>
              <Link
                to="/shipping"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Shipping Info
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-slate-900">Connect</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Newsletter
              </a>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Instagram
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 max-w-4xl mx-auto">
            <p className="text-sm text-slate-500">
              © 2025 Bamazon. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

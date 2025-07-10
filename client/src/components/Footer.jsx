import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

export default function Footer() {
  const footerLinks = {
    Shop: [
      { name: "Electronics", href: "/category/electronics" },
      { name: "Clothing", href: "/category/clothing" },
      { name: "Home & Garden", href: "/category/home-garden" },
      { name: "Sports", href: "/category/sports" },
      { name: "Best Sellers", href: "/bestsellers" },
      { name: "New Arrivals", href: "/new" },
    ],
    "Customer Service": [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Track Order", href: "/track" },
    ],
    About: [
      { name: "Our Story", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Investor Relations", href: "/investors" },
      { name: "Affiliate Program", href: "/affiliates" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
      { name: "Accessibility", href: "/accessibility" },
      { name: "Do Not Sell My Info", href: "/privacy/do-not-sell" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
  ];

  return (
    <footer className="relative mt-auto glass-stronger border-t border-white/30">
      {/* Animated background layers */}
      <div className="absolute inset-0 liquid-gradient-3 opacity-40"></div>
      <div className="absolute inset-0 liquid-gradient-1 opacity-20"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-1/6 w-20 h-20 bg-blue-400/10 rounded-full blur-xl float opacity-50"></div>
      <div className="absolute top-20 right-1/5 w-16 h-16 bg-purple-400/10 rounded-full blur-xl float-delayed opacity-50"></div>
      <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-green-400/10 rounded-full blur-xl float opacity-50"></div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="glass-stronger border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 glass-stronger rounded-3xl flex items-center justify-center shadow-2xl border border-white/40">
                  <div className="absolute inset-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
                  <Mail className="relative h-8 w-8 text-blue-600 drop-shadow-sm" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 drop-shadow-sm">
                Stay in the Loop
              </h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                Get exclusive deals, new arrivals, and insider updates delivered
                to your inbox.
              </p>
              <div className="flex max-w-md mx-auto">
                <div className="flex-1 relative group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 glass-stronger border border-white/30 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 placeholder-slate-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md hover:from-blue-600/90 hover:to-purple-600/90 text-white font-semibold rounded-r-2xl transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="group flex items-center space-x-3 mb-6">
                <div className="relative w-14 h-14 glass-stronger rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300"></div>
                  <span className="relative text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                    B
                  </span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
                  amazoN
                </span>
              </Link>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Your trusted online marketplace for quality products,
                exceptional service, and unbeatable prices.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 glass rounded-2xl flex items-center justify-center border border-white/30 group-hover:glass-stronger transition-all duration-300">
                    <Phone className="h-4 w-4 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors duration-300">
                    1-800-BAMAZON
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 glass rounded-2xl flex items-center justify-center border border-white/30 group-hover:glass-stronger transition-all duration-300">
                    <Mail className="h-4 w-4 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors duration-300">
                    support@bamazon.com
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 glass rounded-2xl flex items-center justify-center border border-white/30 group-hover:glass-stronger transition-all duration-300">
                    <MapPin className="h-4 w-4 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors duration-300">
                    123 Commerce St, Digital City
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="lg:col-span-1">
                <h4 className="font-bold text-slate-900 mb-4 text-lg drop-shadow-sm">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-slate-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-1 block py-1 drop-shadow-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="glass-stronger border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-slate-600">
                <span>© 2024 Bamazon. Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
                <span>by our amazing team.</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-slate-600 mr-2">Follow us:</span>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={`p-3 glass hover:glass-stronger rounded-2xl border border-white/30 transition-all duration-300 hover:scale-110 group ${social.color}`}
                    >
                      <Icon className="h-5 w-5 text-slate-600 group-hover:scale-110 transition-all duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

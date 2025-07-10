import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getCategoryTag = (category) => {
    const tags = {
      Electronics:
        "bg-blue-500/20 text-blue-700 border border-blue-300/30 backdrop-blur-sm",
      Clothing:
        "bg-pink-500/20 text-pink-700 border border-pink-300/30 backdrop-blur-sm",
      "Home & Garden":
        "bg-green-500/20 text-green-700 border border-green-300/30 backdrop-blur-sm",
      Sports:
        "bg-orange-500/20 text-orange-700 border border-orange-300/30 backdrop-blur-sm",
    };
    return (
      tags[category] ||
      "bg-slate-500/20 text-slate-700 border border-slate-300/30 backdrop-blur-sm"
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < Math.floor(rating)
            ? "fill-amber-400 text-amber-400 drop-shadow-sm"
            : "text-slate-300"
        }`}
      />
    ));
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <Card className="group relative h-full overflow-hidden transition-all duration-500 ease-out bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-3 hover:bg-white/20 rounded-3xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
        <CardContent className="relative p-0 z-10">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-200/30 to-slate-100/30 backdrop-blur-sm">
            {product.image ? (
              <>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-110"
                  loading="lazy"
                />
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 opacity-60 group-hover:opacity-80 transition-all duration-500" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200/50 to-slate-100/50 backdrop-blur-md">
                <div className="text-center text-slate-500">
                  <div className="w-16 h-16 mx-auto mb-2 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                    <span className="text-2xl opacity-70">📦</span>
                  </div>
                  <span className="text-sm font-medium">No Image</span>
                </div>
              </div>
            )}

            {/* Floating badges with glass effect */}
            {product.onSale && (
              <Badge className="absolute top-3 left-3 bg-red-500/80 backdrop-blur-md text-white text-xs font-semibold shadow-lg border border-red-300/30 px-3 py-1 rounded-full hover:bg-red-500/90 transition-all duration-300">
                Sale
              </Badge>
            )}

            {product.stock === 0 && (
              <Badge className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md text-slate-700 border border-white/40 text-xs font-medium shadow-lg px-3 py-1 rounded-full">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Liquid glass content area */}
          <div className="p-4 space-y-3 bg-gradient-to-b from-white/80 via-white/60 to-white/40 backdrop-blur-lg border-t border-white/30">
            {/* Category and Rating */}
            <div className="flex items-center justify-between">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryTag(
                  product.category
                )}`}
              >
                {product.category}
              </div>
              {product.rating && (
                <div className="flex items-center gap-1 bg-white/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30">
                  <div className="flex gap-0.5">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-slate-700 font-medium ml-1">
                    {product.rating}
                  </span>
                </div>
              )}
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-base leading-tight line-clamp-2 text-slate-900 group-hover:text-blue-700 transition-colors duration-300 min-h-[2.5rem] drop-shadow-sm">
              {product.name}
            </h3>

            {/* Price section with glass effect */}
            <div className="flex items-center justify-between p-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/40 shadow-inner">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-lg text-slate-900 drop-shadow-sm">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
              </div>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <Badge className="bg-green-500/20 text-green-700 border border-green-300/40 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % off
                  </Badge>
                )}
            </div>

            {/* Floating action button */}
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
              <button className="w-full bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md hover:from-blue-600/90 hover:to-purple-600/90 text-white font-medium py-3 px-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 text-sm backdrop-blur-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

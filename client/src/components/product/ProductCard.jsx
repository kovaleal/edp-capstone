import React, { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../../hooks/useCart";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const ProductCard = memo(function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart, isInCart } = useCart();
  const [cardRef, , hasIntersected] = useIntersectionObserver({
    rootMargin: "100px",
    threshold: 0.1,
  });

  // Default fallback image - a clean product placeholder
  const defaultImage = "../../No_Image_Available.jpg";

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleAddToCart = useCallback(
    async (e) => {
      e.preventDefault(); // Prevent navigation to product page
      e.stopPropagation(); // Stop event bubbling

      if (isAdding || product.stock === 0) return;

      setIsAdding(true);
      try {
        addToCart(product, 1);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000); // Reset after 2 seconds
      } catch (error) {
        console.error("Failed to add to cart:", error);
      } finally {
        setIsAdding(false);
      }
    },
    [isAdding, product, addToCart]
  );

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }, []);

  const getCategoryTag = useCallback((category) => {
    const tags = {
      Electronics:
        "bg-blue-500/20 text-blue-700 border border-blue-300/30 backdrop-blur-sm",
      Clothing:
        "bg-pink-500/20 text-pink-700 border border-pink-300/30 backdrop-blur-sm",
      Home: "bg-green-500/20 text-green-700 border border-green-300/30 backdrop-blur-sm",
      Sports:
        "bg-orange-500/20 text-orange-700 border border-orange-300/30 backdrop-blur-sm",
      Computers:
        "bg-purple-500/20 text-purple-700 border border-purple-300/30 backdrop-blur-sm",
      Beauty:
        "bg-rose-500/20 text-rose-700 border border-rose-300/30 backdrop-blur-sm",
      Books:
        "bg-amber-500/20 text-amber-700 border border-amber-300/30 backdrop-blur-sm",
      Toys: "bg-cyan-500/20 text-cyan-700 border border-cyan-300/30 backdrop-blur-sm",
      Musical:
        "bg-indigo-500/20 text-indigo-700 border border-indigo-300/30 backdrop-blur-sm",
      Office:
        "bg-gray-500/20 text-gray-700 border border-gray-300/30 backdrop-blur-sm",
      Car: "bg-red-500/20 text-red-700 border border-red-300/30 backdrop-blur-sm",
      Health:
        "bg-emerald-500/20 text-emerald-700 border border-emerald-300/30 backdrop-blur-sm",
    };
    return (
      tags[category] ||
      "bg-slate-500/20 text-slate-700 border border-slate-300/30 backdrop-blur-sm"
    );
  }, []);

  const renderStars = useCallback((rating) => {
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
  }, []);

  // Only render full content when intersecting or has intersected
  if (!hasIntersected) {
    return (
      <div
        ref={cardRef}
        className="group relative h-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-3xl"
        style={{ contain: "layout style", minHeight: "400px" }}
      >
        {/* Placeholder content */}
        <div className="animate-pulse">
          <div className="aspect-square bg-gradient-to-br from-slate-200/40 to-slate-100/40 backdrop-blur-sm rounded-t-3xl"></div>
          <div className="p-4 space-y-3 bg-gradient-to-b from-white/60 via-white/40 to-white/20 backdrop-blur-lg">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-white/40 backdrop-blur-sm rounded-full w-20 border border-white/30"></div>
              <div className="h-6 bg-white/40 backdrop-blur-sm rounded-full w-16 border border-white/30"></div>
            </div>
            <div className="h-5 bg-white/40 backdrop-blur-sm rounded-xl w-4/5 border border-white/30"></div>
            <div className="h-12 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <Card
        ref={cardRef}
        className="group relative h-full overflow-hidden transition-all duration-300 ease-out bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:bg-white/20 rounded-3xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
        style={{ contain: "layout style", willChange: "transform" }}
      >
        <CardContent className="relative p-0 z-10">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-200/30 to-slate-100/30 backdrop-blur-sm">
            {/* Loading placeholder */}
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-100/50 backdrop-blur-md flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {product.image && !imageError ? (
              <>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  style={{ willChange: "transform" }}
                />
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
                {/* Shimmer effect - simplified */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </>
            ) : (
              <>
                {/* Fallback image or default placeholder */}
                <img
                  src={defaultImage}
                  alt={product.name || "Product"}
                  className="w-full h-full object-cover object-center transition-all duration-300 ease-out group-hover:scale-105 opacity-80"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  style={{ willChange: "transform" }}
                />
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
                {/* Shimmer effect - simplified */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                {/* Image error indicator */}
                {imageError && (
                  <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-slate-600 border border-white/40">
                    Default Image
                  </div>
                )}
              </>
            )}

            {/* Floating badges with glass effect */}
            {product.onSale && (
              <Badge className="absolute top-3 left-3 bg-red-500/80 backdrop-blur-md text-white text-xs font-semibold shadow-lg border border-red-300/30 px-3 py-1 rounded-full hover:bg-red-500/90 transition-colors duration-200">
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
            <h3 className="font-semibold text-base leading-tight line-clamp-2 text-slate-900 group-hover:text-blue-700 transition-colors duration-200 min-h-[2.5rem] drop-shadow-sm">
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

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding || product.stock === 0}
                className={`
                  relative overflow-hidden w-10 h-10 rounded-xl transition-all duration-200 transform 
                  ${
                    justAdded
                      ? "bg-green-500/90 text-white border border-green-400/50 scale-95"
                      : isInCart(product.id)
                      ? "bg-blue-100/80 text-blue-700 border border-blue-300/50 hover:bg-blue-200/80"
                      : product.stock === 0
                      ? "bg-slate-200/80 text-slate-500 border border-slate-300/50 cursor-not-allowed"
                      : "bg-blue-600/90 text-white border border-blue-500/50 hover:bg-blue-700/90 hover:scale-105 active:scale-95"
                  }
                  shadow-lg backdrop-blur-sm
                `}
              >
                {/* Background shimmer effect for interactive states */}
                {!product.stock === 0 && !justAdded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                )}

                {/* Icon only */}
                <div className="relative flex items-center justify-center">
                  {isAdding ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : justAdded ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <ShoppingCart className="h-4 w-4" />
                  )}
                </div>
              </button>
            </div>

            {/* Stock indicator */}
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-xs text-orange-600 font-medium text-center bg-orange-50/80 backdrop-blur-sm px-3 py-1 rounded-full border border-orange-200/50">
                Only {product.stock} left in stock!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

export default ProductCard;

import React, { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../hooks/useCart";

const ProductCard = memo(function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, isInCart } = useCart();

  const defaultImage = "../../No_Image_Available.jpg";

  const handleAddToCart = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isAdding || product.stock === 0) return;

      setIsAdding(true);
      try {
        addToCart(product, 1);
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
    const firstWord = category
      .split("|")[0]
      .split("&")[0]
      .split(/(?=[A-Z])/)[0];

    const tags = {
      Electronics: "bg-blue-100 text-blue-700",
      Clothing: "bg-pink-100 text-pink-700",
      Home: "bg-green-100 text-green-700",
      Sports: "bg-orange-100 text-orange-700",
      Computers: "bg-purple-100 text-purple-700",
      Beauty: "bg-rose-100 text-rose-700",
      Books: "bg-amber-100 text-amber-700",
      Toys: "bg-cyan-100 text-cyan-700",
      Musical: "bg-indigo-100 text-indigo-700",
      Office: "bg-gray-100 text-gray-700",
      Car: "bg-red-100 text-red-700",
      Health: "bg-emerald-100 text-emerald-700",
    };
    return tags[firstWord] || "bg-slate-100 text-slate-700";
  }, []);

  const renderStars = useCallback((rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "fill-amber-400 text-amber-400"
            : "text-slate-300"
        }`}
      />
    ));
  }, []);

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square bg-slate-50">
          <img
            src={product.image || defaultImage}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />

          {/* Sale Badge */}
          {product.onSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Sale
            </div>
          )}

          {/* Out of Stock */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-slate-900 px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Category and Rating */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryTag(
                product.category
              )}`}
            >
              {
                product.category
                  .split("|")[0]
                  .split("&")[0]
                  .split(/(?=[A-Z])/)[0]
              }
            </span>
            {product.rating && (
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="text-xs text-slate-600 ml-1">
                  {product.rating}
                </span>
              </div>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-slate-900 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-lg text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-sm text-slate-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isInCart(product.id)
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : product.stock === 0
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isAdding ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ShoppingCart className="h-3 w-3" />
              )}
            </button>
          </div>

          {/* Low Stock Warning */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-xs text-orange-600 text-center bg-orange-50 px-2 py-1 rounded">
              Only {product.stock} left!
            </p>
          )}
        </div>
      </div>
    </Link>
  );
});

export default ProductCard;

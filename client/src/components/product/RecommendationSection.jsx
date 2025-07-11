import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Sparkles, TrendingUp } from "lucide-react";
import apiService from "../../services/api";

export default function RecommendationSection({ productId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiService.getRecommendations(productId);
        if (result.success) {
          setRecommendations(result.recommendations);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load recommendations");
        console.error("Recommendation error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [productId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getCategoryTag = (category) => {
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
  };

  const renderStars = (rating) => {
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
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-900">
            Recommended for You
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="animate-pulse bg-slate-50 rounded-xl p-4">
              <div className="aspect-square bg-slate-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <h3 className="text-xl font-bold text-slate-900">
          Customers Also Viewed
        </h3>
        <span className="ml-auto text-sm text-slate-600 bg-blue-100 px-2 py-1 rounded-full">
          AI Powered
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {recommendations.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="block bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200"
          >
            {/* Product Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden mb-3 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "../../No_Image_Available.jpg";
                }}
              />
              {/* Similarity badge */}
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {Math.round(product.similarity * 100)}% match
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h4 className="font-medium text-slate-900 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h4>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="text-xs text-slate-600 ml-1">
                  ({product.ratingCount.toLocaleString()})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">
                  {formatPrice(product.price)}
                </span>
                {product.onSale && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Category badge */}
              <div className="flex items-center">
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
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Link */}
      <div className="mt-6 text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          Explore More Products
        </Link>
      </div>
    </div>
  );
}

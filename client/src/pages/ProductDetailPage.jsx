import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  ChevronRight,
  Package,
  Shield,
  Truck,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "../components/product/ProductCard";
import apiService from "../services/api";
import { useCart } from "../hooks/useCart";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart, isInCart } = useCart();

  // Default fallback image
  const defaultImage = "../../No_Image_Available.jpg";

  // Scroll to top when component mounts or product ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get product details
        const productData = await apiService.getProductById(id);

        if (!productData) {
          setError("Product not found");
          return;
        }

        setProduct(productData);

        // Get related products from same category
        const allProducts = await apiService.getProducts();
        const related = allProducts
          .filter(
            (p) =>
              p.category === productData.category && p.id !== productData.id
          )
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProductData();
    }
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(
      1,
      Math.min(product?.stock || 999, quantity + change)
    );
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (isAddingToCart || !product || product.stock === 0) return;

    setIsAddingToCart(true);
    try {
      addToCart(product, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 3000); // Reset after 3 seconds
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-slate-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl float opacity-60"></div>
          <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl float-delayed opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            {/* Breadcrumb skeleton */}
            <div className="h-6 bg-white/20 rounded-lg w-64"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image skeleton */}
              <div className="aspect-square bg-white/20 rounded-3xl"></div>

              {/* Content skeleton */}
              <div className="space-y-6">
                <div className="h-8 bg-white/20 rounded-lg w-3/4"></div>
                <div className="h-6 bg-white/20 rounded-lg w-1/2"></div>
                <div className="h-12 bg-white/20 rounded-lg w-1/3"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-white/20 rounded w-full"></div>
                  <div className="h-4 bg-white/20 rounded w-5/6"></div>
                  <div className="h-4 bg-white/20 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="relative min-h-screen">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl float opacity-60"></div>
          <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl float-delayed opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="relative w-32 h-32 mb-8 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-2xl border border-white/30 mx-auto">
              <span className="text-5xl opacity-70">❌</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">
              Product Not Found
            </h2>
            <p className="text-slate-600 mb-8">
              {error || "The product you're looking for doesn't exist."}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center space-x-2 glass-stronger hover:glass border border-white/30 px-6 py-3 rounded-xl text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl float opacity-60"></div>
        <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl float-delayed opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-green-400/5 rounded-full blur-3xl float opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            to="/products"
            className="hover:text-blue-600 transition-colors"
          >
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-blue-600 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium truncate">
            {product.name}
          </span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200/30 to-slate-100/30 backdrop-blur-sm shadow-2xl border border-white/30">
              {/* Loading placeholder */}
              {imageLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-100/50 backdrop-blur-md flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {product.image && !imageError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              ) : (
                <img
                  src={defaultImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center opacity-80"
                  onLoad={handleImageLoad}
                />
              )}

              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-60"></div>

              {/* Image error indicator */}
              {imageError && (
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-slate-600 border border-white/40">
                  Default Image
                </div>
              )}

              {/* Discount badge */}
              {product.onSale && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500/90 text-white border-red-400/30 backdrop-blur-sm">
                    {product.discountPercentage} OFF
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100/80 text-blue-700 border-blue-200/50"
                  >
                    {product.category}
                  </Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {product.name}
                  </h1>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 glass-stronger hover:glass border border-white/30 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                      isFavorite
                        ? "text-red-500"
                        : "text-slate-600 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 glass-stronger hover:glass border border-white/30 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-slate-600 hover:text-blue-600"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-lg font-medium text-slate-900">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-slate-500">
                  ({product.ratingCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-slate-900">
                  {formatPrice(product.price)}
                </span>
                {product.onSale && (
                  <span className="text-xl text-slate-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.onSale && (
                <p className="text-green-600 font-medium">
                  You save {formatPrice(product.originalPrice - product.price)}!
                </p>
              )}
            </div>

            {/* Description */}
            <div className="glass-stronger rounded-2xl border border-white/30 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                About this product
              </h3>
              <div className="relative">
                <p
                  className={`text-slate-700 leading-relaxed transition-all duration-300 ${
                    isDescriptionExpanded ? "" : "line-clamp-3"
                  }`}
                >
                  {product.description}
                </p>

                {/* Show more/less button */}
                {product.description && product.description.length > 150 && (
                  <button
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                    className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                  >
                    {isDescriptionExpanded ? "Show less" : "Show more"}
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isDescriptionExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">
                {product.stock > 10
                  ? "In Stock"
                  : `Only ${product.stock} left!`}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700">
                  Quantity:
                </span>
                <div className="flex items-center glass-stronger rounded-xl border border-white/30 shadow-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 font-medium text-slate-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-3 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                className={`w-full flex items-center justify-center space-x-3 font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  product.stock === 0
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : justAdded
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : isInCart(product.id)
                    ? "bg-blue-700 hover:bg-blue-800 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding to Cart...</span>
                  </>
                ) : justAdded ? (
                  <>
                    <Check className="h-6 w-6" />
                    <span>Added to Cart!</span>
                  </>
                ) : product.stock === 0 ? (
                  <>
                    <Package className="h-6 w-6" />
                    <span>Out of Stock</span>
                  </>
                ) : isInCart(product.id) ? (
                  <>
                    <ShoppingCart className="h-6 w-6" />
                    <span>
                      Add More • {formatPrice(product.price * quantity)}
                    </span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-6 w-6" />
                    <span>
                      Add to Cart • {formatPrice(product.price * quantity)}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 glass-stronger rounded-xl border border-white/30 shadow-lg p-4">
                <Truck className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Free Shipping
                  </p>
                  <p className="text-xs text-slate-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 glass-stronger rounded-xl border border-white/30 shadow-lg p-4">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Warranty</p>
                  <p className="text-xs text-slate-600">1 year coverage</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 glass-stronger rounded-xl border border-white/30 shadow-lg p-4">
                <ArrowLeft className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Returns</p>
                  <p className="text-xs text-slate-600">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                You might also like
              </h2>
              <p className="text-slate-600">
                More products from {product.category}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>

            <div className="text-center">
              <Link
                to={`/products?category=${encodeURIComponent(
                  product.category
                )}`}
                className="inline-flex items-center space-x-2 glass-stronger hover:glass border border-white/30 px-6 py-3 rounded-xl text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>View all {product.category} products</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

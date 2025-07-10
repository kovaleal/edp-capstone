import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import ProductGrid from "../components/product/ProductGrid";
import { Pagination, PaginationSelect } from "../components/ui/pagination";
import apiService from "../services/api";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);

  // Pagination state
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          apiService.getProducts(),
          apiService.getCategories(),
        ]);

        setAllProducts(productsData);
        setCategories(categoriesData);

        // Set price range based on actual product prices
        if (productsData.length > 0) {
          const prices = productsData.map((p) => p.price);
          setPriceRange({
            min: Math.floor(Math.min(...prices)),
            max: Math.ceil(Math.max(...prices)),
          });
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.description &&
            product.description.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "rating":
          aValue = a.rating;
          bValue = b.rating;
          break;
        case "name":
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredProducts(filtered);

    // Reset to first page when filters change
    setCurrentPage(1);
  }, [
    allProducts,
    searchQuery,
    selectedCategory,
    sortBy,
    sortOrder,
    priceRange,
  ]);

  // Pagination effect
  useEffect(() => {
    const totalItems = filteredProducts.length;
    const totalPagesCount = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPagesCount);

    // Calculate paginated products
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filteredProducts.slice(startIndex, endIndex);
    setPaginatedProducts(paginated);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    setSearchParams(params);
  }, [searchQuery, selectedCategory, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange({ min: 0, max: 1000 });
    setSortBy("name");
    setSortOrder("asc");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl float opacity-60"></div>
        <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl float-delayed opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
            All Products
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Discover our complete collection of quality products
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative group">
            <div className="relative glass-stronger rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-500 rounded-2xl text-lg"
              />
            </div>
          </form>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Toggle Filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 glass-stronger hover:glass border border-white/30 px-4 py-3 rounded-xl text-slate-700 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center glass-stronger rounded-xl border border-white/30 shadow-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-blue-500/20 text-blue-700"
                    : "text-slate-600 hover:text-blue-600 hover:bg-white/20"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-blue-500/20 text-blue-700"
                    : "text-slate-600 hover:text-blue-600 hover:bg-white/20"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Results Count */}
            <div className="glass-stronger px-4 py-3 rounded-xl border border-white/30 shadow-lg">
              <span className="text-slate-700 font-medium">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </span>
            </div>

            {/* Items per page selector */}
            <PaginationSelect
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              options={[12, 24, 48, 96]}
            />

            {/* Clear Filters */}
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 font-medium transition-colors duration-300"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="glass-stronger rounded-2xl border border-white/30 shadow-xl p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 glass rounded-xl border border-white/30 text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 glass rounded-xl border border-white/30 text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Order
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full p-3 glass rounded-xl border border-white/30 text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <ProductGrid products={paginatedProducts} loading={loading} />

        {/* Pagination */}
        {!loading && filteredProducts.length > 0 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredProducts.length}
              className="glass-stronger rounded-2xl border border-white/30 shadow-xl p-6"
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="relative w-32 h-32 mb-8 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-2xl border border-white/30 mx-auto">
              <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
              <span className="relative text-5xl opacity-70 filter drop-shadow-lg">
                🔍
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 drop-shadow-sm">
              No products found
            </h3>
            <p className="text-slate-600 max-w-md mx-auto leading-relaxed drop-shadow-sm mb-6">
              Try adjusting your search criteria or browse our categories to
              find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-2 glass-stronger hover:glass border border-white/30 px-6 py-3 rounded-xl text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Clear all filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

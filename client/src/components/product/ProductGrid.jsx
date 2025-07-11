import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 animate-pulse"
          >
            <div className="aspect-square bg-slate-200 rounded-t-xl"></div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-5 bg-slate-200 rounded-full w-16"></div>
                <div className="h-4 bg-slate-200 rounded w-12"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 mb-6 bg-slate-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-900">
          No products found
        </h3>
        <p className="text-slate-600 max-w-md">
          Try adjusting your search or browse our categories to find what you're
          looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products
        .filter((product) => product && product.id)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}

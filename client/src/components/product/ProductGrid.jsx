import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="group">
            <div className="relative h-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-3xl animate-pulse">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out"></div>

              {/* Image placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-slate-200/40 to-slate-100/40 backdrop-blur-sm rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
              </div>

              {/* Content placeholder */}
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
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative w-32 h-32 mb-8 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
          {/* Glass orb effect */}
          <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
          <span className="relative text-5xl opacity-70 filter drop-shadow-lg">
            🔍
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-900 drop-shadow-sm">
          No products found
        </h3>
        <p className="text-slate-600 max-w-md leading-relaxed drop-shadow-sm">
          Try adjusting your search or browse our categories to find what you're
          looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

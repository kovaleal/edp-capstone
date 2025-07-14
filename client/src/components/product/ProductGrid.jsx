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

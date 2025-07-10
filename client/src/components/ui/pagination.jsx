import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 12,
  totalItems = 0,
  className = "",
}) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show around current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    // Calculate range around current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where needed
    let prev = 0;
    for (const page of range) {
      if (page - prev > 1) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(page);
      prev = page;
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      {/* Results info */}
      <div className="text-sm text-slate-600 order-2 sm:order-1">
        Showing{" "}
        <span className="font-medium text-slate-900">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="font-medium text-slate-900">{totalItems}</span>{" "}
        results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1 order-1 sm:order-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 glass-stronger hover:glass border border-white/30 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:glass-stronger text-slate-700 hover:text-blue-600 shadow-lg hover:shadow-xl"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <div
                  key={`dots-${index}`}
                  className="flex items-center justify-center w-10 h-10 text-slate-500"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </div>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center w-10 h-10 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                  currentPage === page
                    ? "bg-blue-500/20 text-blue-700 border border-blue-300/30 backdrop-blur-sm glass-stronger"
                    : "glass-stronger hover:glass border border-white/30 text-slate-700 hover:text-blue-600"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-10 h-10 glass-stronger hover:glass border border-white/30 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:glass-stronger text-slate-700 hover:text-blue-600 shadow-lg hover:shadow-xl"
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function PaginationSelect({
  itemsPerPage,
  onItemsPerPageChange,
  options = [12, 24, 48, 96],
  className = "",
}) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-slate-600 font-medium">Show:</span>
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className="px-3 py-2 glass rounded-xl border border-white/30 text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-sm bg-transparent backdrop-blur-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="text-sm text-slate-600">per page</span>
    </div>
  );
}

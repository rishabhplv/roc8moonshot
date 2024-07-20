"use client";
import React from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  const renderPagination = () => {
    const pages = [];
    const totalDisplayedPages = 7;

    // Calculate start and end page numbers
    const startPage = Math.max(1, page - 3);
    const endPage = Math.min(totalPages, page + 3);

    if (page <= 4) {
      // Show first 7 pages if on or near the first page
      for (let i = 1; i <= totalDisplayedPages && i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-2 py-1 ${page === i ? "text-black" : "text-gray-400"}`}
          >
            {i}
          </button>,
        );
      }
      if (totalPages > totalDisplayedPages) {
        pages.push(<span key="ellipsis-end">...</span>);
        pages.push(
          <button
            key={totalPages}
            onClick={() => setPage(totalPages)}
            className={`px-2 py-1 ${page === totalPages ? "text-black" : "text-gray-400"}`}
          >
            {totalPages}
          </button>,
        );
      }
    } else if (page >= totalPages - 3) {
      // Show last 7 pages if on or near the last page
      pages.push(
        <button
          key={1}
          onClick={() => setPage(1)}
          className={`px-2 py-1 ${page === 1 ? "text-black" : "text-gray-400"}`}
        >
          1
        </button>,
      );
      pages.push(<span key="ellipsis-start">...</span>);
      for (let i = totalPages - totalDisplayedPages + 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-2 py-1 ${page === i ? "text-black" : "text-gray-400"}`}
          >
            {i}
          </button>,
        );
      }
    } else {
      // Show pages around the current page with ellipses
      pages.push(
        <button
          key={1}
          onClick={() => setPage(1)}
          className={`px-2 py-1 ${page === 1 ? "text-black" : "text-gray-400"}`}
        >
          1
        </button>,
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis-start">...</span>);
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-2 py-1 ${page === i ? "text-black" : "text-gray-400"}`}
          >
            {i}
          </button>,
        );
      }
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis-end">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => setPage(totalPages)}
          className={`px-2 py-1 ${page === totalPages ? "text-black" : "text-gray-400"}`}
        >
          {totalPages}
        </button>,
      );
    }

    return (
      <div className="flex justify-center space-x-1">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="px-2 py-1 text-gray-400"
        >
          {"<<"}
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 text-gray-400"
        >
          {"<"}
        </button>
        {pages}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-1 text-gray-400"
        >
          {">"}
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="px-2 py-1 text-gray-400"
        >
          {">>"}
        </button>
      </div>
    );
  };

  return renderPagination();
};

export default Pagination;

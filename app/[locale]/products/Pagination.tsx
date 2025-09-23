import React from "react";
import { FaChevronDown } from "react-icons/fa";


const Pagination = ({ data, currentPage, setCurrentPage, setPageSize, pageSize }) => {
  const productCounts = Array.from(
    { length: Math.floor(data?.products?.total_count / 12) + 1 },
    (_, index) => index * 12
  );
  const handleChangePageSize = (event) => {
    // event.preventDefault();
    const value = event.target.value;
    setPageSize(value);
  };
  const handlePageChange = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    // Determine the range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(data?.products?.page_info?.total_pages, startPage + maxVisiblePages - 1);

    // Adjust startPage if there are not enough pages before
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Build the array of page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };
  return (
    data?.products?.page_info?.total_pages > 1 && (
      <div className="flex items-center justify-between w-full">
        <div className="flex justify-center space-x-2">
          {/* Previous button */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(event, currentPage - 1)}
              className="px-2 py-1 text-black bg-gray-300 rounded"
            >
              <FaChevronDown className="w-5 h-5 rotate-90 text-slate-500" />
            </button>
          )}
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(event, page)}
              className={`p-2 rounded text-center text-md ${
                currentPage === page ? "bg-neutral-200 text-black" : "text-sky-800"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next button */}
          {currentPage < data?.products?.page_info?.total_pages && (
            <button
              onClick={() => handlePageChange(event, currentPage + 1)}
              className="px-2 py-1 text-black bg-gray-300 rounded"
            >
              <FaChevronDown className="w-5 h-5 -rotate-90 text-slate-500" />
            </button>
          )}
        </div>
        <select
          value={pageSize}
          onChange={handleChangePageSize}
          className="outline-none max-w-fit py-[6px] px-4 text-sm bg-gray-50 placeholder:text-gray-600 placeholder:px-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-1 px-2 rounded-sm dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:shadow-[0_0_3px_1px_#00699d]"
        >
          <option disabled>{data?.products?.page_info.page_size}</option>
          {productCounts.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  );
}

export default Pagination;
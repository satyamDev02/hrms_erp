import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({
  itemList,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  setSearchCall,
}) => {
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);
  const [inputPage, setInputPage] = useState(currentPage);

  const getTotalPages = () => Math.ceil(itemList / itemsPerPage);
  const totalPages = getTotalPages();

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSearchCall((prev) => prev + 1);
    }
  };

  const itemsPerPageOptions = [10, 30, 50, 70, 100];

  const handleItemsPerPageChange = (event) => {
    const value = Number(event.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
    setInputPage(1);
    setSearchCall((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const onPageChange = (pageIndex) => {
    handlePageChange(pageIndex);
  };
  return (
    <div className="pagination">
      <div className="rows-per-page">
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
      </div>
      <div className="page-navigation">
        <div className="page-numbers">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <button
              key={pageIndex + 1}
              className={currentPage === pageIndex + 1 ? "activePageIndex" : ""}
              onClick={() => onPageChange(pageIndex + 1)}
            >
              {pageIndex + 1}

            </button>
          ))}
        </div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          {" "}
          <FaAngleLeft />
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

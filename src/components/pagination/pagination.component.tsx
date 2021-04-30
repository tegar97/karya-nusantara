import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({ page, setPage, totalPages }) {
  const handlePageChange = (data) => {
    let pageNumber = data.selected;
    setPage(pageNumber + 1);
  };

  return (
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
}

export default Pagination;

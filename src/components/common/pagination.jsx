import React from "react";
import _ from "lodash";

const Pagination = props => {
  const { itemCount, pageSize, onPageChange, currentPage } = props;
  console.log(itemCount);
  const pageCount = itemCount / pageSize;
  if (pageCount <= 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pageLinkClassName = page => {
    return page === currentPage ? "page-item active" : "page-item";
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={pageLinkClassName(2)}>
          <a
            onClick={() => onPageChange("prev")}
            className="page-link"
            href="#"
          >
            Previous
          </a>
        </li>
        {pages.map(page => {
          return (
            <li key={page} className={pageLinkClassName(page)}>
              <a
                className="page-link"
                onClick={() => onPageChange(page)}
                href="#"
              >
                {page}
              </a>
            </li>
          );
        })}
        <li className={pageLinkClassName("next")}>
          <a
            onClick={() => onPageChange("next")}
            className="page-link"
            href="#"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

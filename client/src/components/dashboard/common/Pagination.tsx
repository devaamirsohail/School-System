import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination pagination-sm float-right">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <Link onClick={() => paginate(number)} to="#" className="page-link">
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

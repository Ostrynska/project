import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.css';

interface PaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (selectedPage: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
        forcePage={currentPage}
    />
  );
};

export default Pagination;

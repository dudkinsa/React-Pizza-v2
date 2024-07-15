import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Paginarion.module.scss';


const Pagination = ({currentPage, onChangePage }) => {
    return (
        <>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={(event) => onChangePage(event.selected + 1)}
                // onPageChange={(event) => console.log(event)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage-1}
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Pagination;
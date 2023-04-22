import React, { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import './index.css';

export default function Page({data}) {
    const [currentPage, setCurrentPage] = useState(0);

    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;

    const currentPageData = useMemo(() => {
        return data.slice(offset, offset + PER_PAGE);
    }, [currentPage]);

    const pageCount = Math.ceil(data.length / PER_PAGE);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="container">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                    </tr>

                    </thead>
                    <tbody>
                    {currentPageData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel="..."
                pageCount={pageCount}
                onPageChange={handlePageClick}
                forcePage={currentPage}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
            />
        </div>
    );
}

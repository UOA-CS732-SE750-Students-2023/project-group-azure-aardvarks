import React, { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import './index.css';
import "./button.scss"
import {Link} from "react-router-dom";

export default function Page({data, category}) {
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
                            <td className="mt-4">
                                {category==="album"?
                                    <div id="container">
                                        <button className="learn-more">
                                            <span className="circle" aria-hidden="true">
                                                <span className="icon arrow"></span>
                                            </span>
                                            <span className="button-text">{item.name}</span>
                                        </button>
                                    </div>:
                                    category==="song"?<Link to={"/song"} className="button_search">{item.name}</Link>:
                                category==="singer"?<Link to={"/singer"} className="button_search">{item.name}</Link>:
                                    <p>something wrong</p>}
                            </td>
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

import React, {useState, useMemo, useContext} from 'react';
import ReactPaginate from 'react-paginate';
import './index.css';
import "./button.scss"
import {Link, useNavigate} from "react-router-dom";
import SongList from "../SongList.jsx";
import PlayerContext, {useToast} from "../../utils/AppContextProvider.jsx";
import {Col, Row} from "react-bootstrap";

export default function AlbumPage({data, category}) {
    if (data===undefined && category === "album"){
        data = [
            {
                "name": "",
                "id": "",
                "picUrl": "",
                "artist": {
                    "name": "",
                    "id": "",
                    "picUrl": ""
                },
                "size": ""
            }
        ]
    }
    let check_empty = false
    if (data[0].id === ""){
        check_empty = true
    }
    const {addToast} = useToast();
    const Navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 12;
    const offset = currentPage * PER_PAGE;

    const currentPageData = useMemo(() => {
        return data.slice(offset, offset + PER_PAGE);
    }, [currentPage]);

    const pageCount = Math.ceil(data.length / PER_PAGE);

    const handlePageClick = ({selected}) => {
        setCurrentPage(selected);
    };
    return (
        <div className="container">
            {check_empty?<h1>no result</h1>:
                <div className="table-responsive">
                        {currentPageData.map((item) => {
                            if (category === "album") {
                                return (
                                    <div key={item.id} className="four">
                                        <img onClick={() => {Navigate(`/album/${item.id}`);}}
                                             className="album_pic mt-4 me-3 mb-4 ms-2" src={item.picUrl} alt="My Image" />
                                        <p className="albumNameSize">{item.name}</p>
                                        <p className="albumartistSize">{item.artist.name}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td className="mt-4">
                                            <p>something wrong</p>
                                        </td>
                                    </tr>
                                );
                            }
                        })}

                </div>}
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

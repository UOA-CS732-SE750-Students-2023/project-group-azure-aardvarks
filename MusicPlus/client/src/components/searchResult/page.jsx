import React, {useState, useMemo, useContext} from 'react';
import ReactPaginate from 'react-paginate';
import './index.css';
import "./button.scss"
import {Link, useNavigate} from "react-router-dom";
import SongList from "../SongList.jsx";
import PlayerContext, {useToast} from "../../utils/AppContextProvider.jsx";
import {Col, Row} from "react-bootstrap";

export default function Page({data, category}) {
    const {addToast} = useToast();
    const {currentPlayList, setCurrentPlayList} = useContext(PlayerContext);
    const [isLoading, setIsLoading] = useState(false);

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

    async function handleAddToPlayer(song) {
        try {
            setIsLoading(true);
            const lyricResponse = await fetch(
                "http://127.0.0.1:3000/api/music/lyric/" + song.id
            );
            let lyricData = await lyricResponse.json();
            console.log(song)
            console.log(lyricData.data)
            const songFile = await fetch("http://127.0.0.1:3000/api/music/play/" + song.id)
            let songData = await songFile.blob()
            songData = URL.createObjectURL(songData)
            let formattedSinger = ''
            for (const i in song.artists) {
                formattedSinger = song.artists[i].name + '/'
            }
            formattedSinger = formattedSinger.substring(0, formattedSinger.length - 1)
            const musicDetail = {
                _id: song._id,
                name: song.name,
                singer: formattedSinger,
                cover: song.album.picUrl,
                musicSrc: songData,
                lyric: lyricData.data,
                style: song.style
            }
            // setCurrentPlayList([...currentPlayList,musicDetail])
            setCurrentPlayList(prevList => [...prevList, musicDetail])
            setIsLoading(false);
            addToast(song.name + ' being added to the playlist!');
        } catch (e) {
            console.log(e)
            addToast("Song add error! We will fix it ASAP!")
        }

    }

    return (
        <div className="container">
            <div className="table-responsive">
                <table className="table">
                    {category === "album" ?
                        <thead>
                            <tr>
                            </tr>
                        </thead> :
                        category === "song" ?
                            <thead>
                                <tr>
                                    <td>Song</td>
                                    <td>Singer</td>
                                    <td>Album</td>
                                </tr>
                            </thead> :
                            category === "singer" ?
                                <thead>
                                    <tr>
                                    </tr>
                                </thead> :
                                <div>
                                    <p>something wrong</p>
                                </div>
                    }


                    <tbody>
                    {currentPageData.map((item) => {
                        if (category === "album") {
                            return (
                                <tr key={item.id} className="four mt-4">
                                    <td>
                                        <img onClick={() => {Navigate(`/album/${item.id}`);}}
                                             className="singer_pic" src={item.picUrl} alt="My Image" />
                                    </td>
                                </tr>



                                // <tr key={item.id}>
                                //     <td>{item.id}</td>
                                //     <td className="mt-4">
                                //         <div id="container">
                                //             <button className="learn-more" onClick={() => {Navigate(`/album/${item.id}`);}}>
                                //             <span className="circle" aria-hidden="true">
                                //               <span className="icon arrow"></span>
                                //             </span>
                                //                 <span className="button-text">{item.name}</span>
                                //             </button>
                                //         </div>
                                //     </td>
                                // </tr>
                            );
                        } else if (category === "song") {
                            return (
                                <tr key={item.id} className="song_list" onClick={() => handleAddToPlayer(item)}>
                                    <td><p onClick={()=>Navigate(`/song/?keyword=${item.id}`)}>{item.name}</p></td>
                                    <td><p onClick={()=>Navigate(`/singer/${item.artists[0].id}`)}>{item.artists[0].name}</p></td>
                                    <td><p onClick={()=>Navigate(`/album/${item.album.id}`)}>{item.album.name}</p></td>
                                </tr>
                            );
                        } else if (category === "singer") {
                            return (
                                <tr key={item.id} className="song_list" onClick={()=>Navigate(`/singer/${item.id}`)}>
                                    <td>
                                        <Row>
                                        <Col xs={10}><img className="singer_pic me-4" src={item.picUrl} alt="My Image" /></Col>
                                        <Col className="vertical_center"><p>{item.name}</p></Col>
                                        </Row>
                                    </td>
                                </tr>
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

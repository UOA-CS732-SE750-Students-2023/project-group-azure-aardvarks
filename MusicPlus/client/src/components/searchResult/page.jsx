import React, {useState, useMemo, useContext} from 'react';
import ReactPaginate from 'react-paginate';
import './index.css';
import "./button.scss"
import {Link, useNavigate} from "react-router-dom";
import SongList from "../SongList.jsx";
import PlayerContext, {useToast} from "../../utils/AppContextProvider.jsx";

export default function Page({data, category}) {
    const { addToast } = useToast();
    const {currentPlayList, setCurrentPlayList} = useContext(PlayerContext);
    const [isLoading, setIsLoading] = useState(false);

    const Navigate = useNavigate();
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

    async function handleAddToPlayer(song) {
        try{
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
            addToast(song.name+' being added to the playlist!');
        }catch (e){
            console.log(e)
            addToast("Song add error! We will fix it ASAP!")
        }

    }

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
                                        <button className="learn-more" onClick={() => {Navigate(`/album/${item.id}`);}}>
                                            <span className="circle" aria-hidden="true">
                                                <span className="icon arrow"></span>
                                            </span>
                                            <span className="button-text">{item.name}</span>
                                        </button>
                                    </div>:
                                category==="song"?
                                    <div>
                                        <Link to={`/song/?keyword=${item.id}`} className="button_search">{item.name}</Link>
                                        <button className="button_search" onClick={()=>handleAddToPlayer(item)}>play</button>
                                    </div>:
                                category==="singer"?
                                    <div>
                                        <Link to={`/singer/${item.id}`} className="button_search">{item.name}</Link>
                                    </div>:
                                    <div>
                                        <p>something wrong</p>
                                    </div>
                                }
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

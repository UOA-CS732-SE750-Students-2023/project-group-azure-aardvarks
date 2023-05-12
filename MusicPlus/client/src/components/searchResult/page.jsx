import React, {useState, useMemo, useContext} from 'react';
import ReactPaginate from 'react-paginate';
import './index.css';
import "./button.scss"
import {Link, useNavigate} from "react-router-dom";
import SongList from "../SongList.jsx";
import PlayerContext, {UserContext, useToast} from "../../utils/AppContextProvider.jsx";
import {Col, Row, Dropdown, ButtonGroup, DropdownButton} from "react-bootstrap";
import play from "../../assets/play.png"
import more1 from "../../assets/more1.png"
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import playlist from "../Playlist/Playlist.jsx";


export default function Page({data, category}) {
    // console.log(data)
    if (data===undefined && category === "song"){
        data = [
            {
                "name": "",
                "id": "",
                "artists": [
                    {
                        "name": "",
                        "id": ""
                    }
                ],
                "album": {
                    "name": "",
                    "id": ""
                }
            }
        ]
    }
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
    if (data===undefined && category === "singer"){
        data = [
            {
                "name": "",
                "id": "",
                "picUrl": ""
            }
        ]
    }
    let check_empty = false
    if (data[0] === undefined || data[0].id === "" || data[0].id === undefined){
        check_empty = true
    }

    const {addToast} = useToast();
    const {currentPlayList, setCurrentPlayList} = useContext(PlayerContext);
    const {userPlaylist, setUserPlaylist, userDetail,renewUserPlaylist} = useContext(UserContext);
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
            const response = await axios.get(`${BACKEND_API}/api/music/detail/${song.id}`);
            console.log(response.data.data.style)
            setIsLoading(true);
            const lyricResponse = await fetch(
                `${BACKEND_API}/api/music/lyric/` + song.id
            );
            let lyricData = await lyricResponse.json();
            const songFile = await fetch(`${BACKEND_API}/api/music/play/` + song.id)
            let songData = await songFile.blob()
            songData = URL.createObjectURL(songData)
            let formattedSinger = ''
            for (const i in song.artists) {
                formattedSinger = song.artists[i].name + '/'
            }
            formattedSinger = formattedSinger.substring(0, formattedSinger.length - 1)
            console.log(song)
            const musicDetail = {
                _id: song.id.toString(),
                name: song.name,
                singer: formattedSinger,
                cover: response.data.data.album.picUrl,
                musicSrc: songData,
                lyric: lyricData.data,
                style: response.data.data.style
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

    async function handleAddSongToMyPlayList(song, playListId) {
        try{
            const response = await axios.post(`${BACKEND_API}/api/playList/addSong`
                , {
                "_id":playListId,
                "songs":[`${song.id}`]
            }
            , {headers:{
                    'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                    'Authorization': 'Basic ' + btoa(`${userDetail.username}:${userDetail.password}`)
                }}).catch((err)=>{
                console.log(err)
            })
        }catch (e) {
            console.log(e)
            addToast("Something wrong! We will fix it ASAP!")
        }

    }

    return (
        <div className="container">
            {check_empty?<h1>no result</h1>:
            <div className="table-responsive">
                {category==="song"?
                    <div style={{paddingBottom: 15}}>
                        <DropdownButton
                            align="end"
                            title="+ Add"
                            id="dropdown-menu-align-end"
                            size={"sm"}
                            variant="outline-secondary"
                            style={{
                                borderRadius: 25,
                                borderColor: "gray"
                            }}
                        >
                            {/*<Dropdown.Item eventKey="1">Action</Dropdown.Item>*/}
                            {/*<Dropdown.Item eventKey="2">Another action</Dropdown.Item>*/}
                            {/*<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>*/}
                            {userPlaylist.map((value, key) => (
                                <div key={key}>
                                    <Dropdown.Item
                                        eventKey={`${key}`}
                                        onClick={() => {
                                            for (let song in data){
                                                // console.log(song)
                                                handleAddSongToMyPlayList(data[song], value._id)
                                            }
                                        }}
                                    >
                                        {value.name}
                                    </Dropdown.Item>
                                </div>

                            ))}
                            <Dropdown.Divider/>
                            <Dropdown.Item
                                eventKey="4"
                                onClick={() => {
                                    for (let song in data){
                                        // console.log(data[song])
                                        handleAddToPlayer(data[song])}
                                }
                                }
                                //裴 onClick={()=>handleAddToPlayer(song._id, song.singer, song.name)}
                            >
                                Current playlist
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>:
                            ""
                }


                <table className="table">
                    {category === "album" ?
                        <thead>
                            <tr>
                            </tr>
                        </thead> :
                        category === "song" ?
                            <thead>
                                <tr>
                                    <td style={{fontSize: "25px",fontWeight:"bold"}}>Song</td>
                                    <td style={{fontSize: "25px",fontWeight:"bold"}}>Singer</td>
                                    <td style={{fontSize: "25px",fontWeight:"bold"}}>Album</td>
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
                                <tr key={item.id} className="song_list" onDoubleClick={() => handleAddToPlayer(item)}>
                                    <td>
                                        <Row>
                                            <Col>
                                                <span className="songSize changeMouse" onClick={()=>Navigate(`/song/?keyword=${item.id}`)}>{item.name}</span>
                                            </Col>
                                            <Col>
                                                <img onClick={() => handleAddToPlayer(item)} className="cancel playerIconSize changeMouse" src={play}></img>
                                            </Col>
                                        </Row>
                                    </td>
                                    <td><span className="changeMouse" onClick={()=>Navigate(`/singer/${item.artists[0].id}`)}>{item.artists[0].name}</span></td>
                                    <td><span className="changeMouse" onClick={()=>Navigate(`/album/${item.album.id}`)}>{item.album.name}</span></td>
                                    <td>
                                        <Dropdown as={ButtonGroup} className="custom-dropdown">
                                            <Dropdown.Toggle variant="light" id="dropdown-basic" className="dropdownButton">
                                                <img className="more changeMouse" src={more1}></img>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item className="dropdownTitle">add to playlist</Dropdown.Item>
                                                <Dropdown.Divider/>
                                                {userPlaylist.map((value, key) => (
                                                    <div key={key}>
                                                        <Dropdown.Item
                                                            eventKey={`${key}`}
                                                            onClick={() => handleAddSongToMyPlayList(item, value._id)}
                                                        >
                                                            {value.name}
                                                        </Dropdown.Item>
                                                    </div>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            );
                        } else if (category === "singer") {
                            return (
                                <tr key={item.id} className="song_list" onClick={()=>Navigate(`/singer/${item.id}`)}>
                                    <td>
                                        <Row>
                                        <Col xs={10}><img className="singer_pic me-4" src={item.picUrl} alt="My Image" /></Col>
                                        <Col className="vertical_center"><p className="singerNameSize">{item.name}</p></Col>
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

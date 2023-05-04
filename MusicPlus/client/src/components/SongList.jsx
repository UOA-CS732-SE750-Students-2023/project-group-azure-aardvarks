import Table from "react-bootstrap/Table";
import React, {useContext, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import {useToast} from "../utils/AppContextProvider.jsx";
import Dropdown from 'react-bootstrap/Dropdown';
import {DropdownButton, Modal, Spinner} from "react-bootstrap";
import axios from "axios";
import {BACKEND_API} from "../utils/env.js";
import PlayerContext, {
    NotificationContext,
    TemporaryPlayListContext,
    UserContext
} from "../utils/AppContextProvider.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {nanoid} from "nanoid";


function SongList({songList}) {
    const history = useNavigate();
    // const { addToast } = useToast();
    const { addToast, removeToast} = useContext(NotificationContext)
    const {currentPlayList, setCurrentPlayList} = useContext(PlayerContext);
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state
    const [selectedSong, setSelectedSong] = useState();
    const [show, setShow] = useState(false);
    const {
        removeTemporaryPlaylist,
        addToTemporaryPlaylist,
        addToCurrentPlaylist,
        showTemporaryPlaylist
    } = useContext(TemporaryPlayListContext)
    const {userPlaylist, setUserPlaylist, userDetail} = useContext(UserContext)

    async function handleAddToPlayer(song) {
        // use { responseType: 'arraybuffer' } to get the AUDIO STREAM binary data from XMLHttpRequest
        // const response = await axios.get(`${BACKEND_API}/api/music/play/${id}`, { responseType: 'arraybuffer' })
        // let formattedSinger = ''
        // for (const i in singerList) {
        //     formattedSinger = singerList[i].name + '-'
        // }
        //
        //
        // const uint8Array = new Uint8Array(response.data);
        // const blob = new Blob([uint8Array], {type: "audio/mp3"}); // convert Uint8Array to Blob with a mp3 type
        // const musicSrc = URL.createObjectURL(blob); // use blob to create a temporary address, like ./xxx.mp3
        //                                             // once you close your browser, the blob will destroy
        //
        // const musicDetail = {
        //     name:name,
        //     singer:formattedSinger,
        //     musicSrc:musicSrc
        // }
        try{
            const tempId = nanoid();
            setIsLoading(true);
            addToast(tempId,`Adding ${song.name} to my list, please wait !!!`, {"autohide":false})
            const lyricResponse = await fetch(
                "http://127.0.0.1:3000/api/music/lyric/" + song._id
            );
            let lyricData = await lyricResponse.json();
            const songFile = await fetch("http://127.0.0.1:3000/api/music/play/" + song._id)
            let songData = await songFile.blob()
            songData = URL.createObjectURL(songData)

            let formattedSinger = ''
            for (const i in song.singer) {
                formattedSinger = song.singer[i].name + '/'
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
            // addToast(song.name+' being added to the playlist!');
            removeToast(tempId)
        }catch (e){
            console.log(e)
            addToast("Song error! We will fix it ASAP!")
        }

    }

    function handleAddToTemporaryList(song) {
        addToTemporaryPlaylist(song)
    }
    function handleGoToAlbum(album) {
        history("/album/"+album.id)
    }
    function handleGoToSinger(singer) {
        history("/singer/"+singer)
    }

    function handleShowSingers(song){
        setShow(true)
        setSelectedSong(song)
    }

    async function handleAddSongToMyPlayList(song, playListId) {

        try{
            const response = await axios.post(`${BACKEND_API}/api/playList/addSong`, {
                "_id":playListId,
                "songs":[`${song._id}`]
            }, {headers:{
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
        <>
            {/*<div style={{paddingBottom: 15}}>*/}
            {/*    <DropdownButton*/}
            {/*        align="end"*/}
            {/*        title="+ Add"*/}
            {/*        id="dropdown-menu-align-end"*/}
            {/*        size={"sm"}*/}
            {/*        variant="outline-secondary"*/}
            {/*        style={{*/}
            {/*            borderRadius: 25,*/}
            {/*            borderColor: "gray"*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        /!*<Dropdown.Item eventKey="1">Action</Dropdown.Item>*!/*/}
            {/*        /!*<Dropdown.Item eventKey="2">Another action</Dropdown.Item>*!/*/}
            {/*        /!*<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>*!/*/}
            {/*        {userPlaylist.map((value, key) => (*/}
            {/*            <div key={key}>*/}
            {/*                <Dropdown.Item*/}
            {/*                    eventKey={`${key}`}*/}
            {/*                    onClick={() => {*/}
            {/*                        for (let song in songList){*/}
            {/*                            handleAddSongToMyPlayList(songList[song], value._id)*/}
            {/*                        }*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    {value.name}*/}
            {/*                </Dropdown.Item>*/}
            {/*            </div>*/}

            {/*        ))}*/}
            {/*        <Dropdown.Divider/>*/}
            {/*        <Dropdown.Item*/}
            {/*            eventKey="4"*/}
            {/*            onClick={() => {*/}
            {/*                for (let song in songList){*/}
            {/*                    handleAddToPlayer(songList[song])}*/}
            {/*                }*/}
            {/*            }*/}
            {/*            //裴 onClick={()=>handleAddToPlayer(song._id, song.singer, song.name)}*/}
            {/*        >*/}
            {/*            Current playlist*/}
            {/*        </Dropdown.Item>*/}
            {/*    </DropdownButton>*/}
            {/*</div>*/}
            <div>
                <Table striped bordered hover style={{cursor:"default"}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Singer</th>
                        <th>Album</th>
                        {/*<th>Style</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {songList.map((song, index) => (
                        <tr key={song._id} >
                            <td>{index + 1}</td>
                            {/*<td>{song.name}</td>*/}
                            {/*<td>{song.singer.map((singer, index) => (<div key={index} onClick={() => handleGoToSinger(singer.id)}>{singer.name}</div>))}</td>*/}
                            {/*<td onClick={() => handleGoToAlbum(song.album)}>{song.album.name}</td>*/}
                            <td onClick={()=>handleAddToPlayer(song)}>{song.name}</td>
                            <td onClick={()=>handleAddToPlayer(song)}>{song.singer.map((singer, index) => (<div key={index}>{singer.name}</div>))}</td>
                            <td onClick={()=>handleAddToPlayer(song)}>{song.album.name}</td>
                            {/*<td>{song.style.name}</td>*/}
                            <td style={{width: 100}}>
                                <DropdownButton
                                    align="end"
                                    title="More"
                                    id="dropdown-menu-align-end"
                                    size={"sm"}
                                    variant="outline-secondary"
                                >
                                    {/*<Dropdown.Item eventKey="1">Action</Dropdown.Item>*/}
                                    {/*<Dropdown.Item eventKey="2">Another action</Dropdown.Item>*/}
                                    {/*<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>*/}
                                    {userPlaylist.map((value, key) => (
                                        <div key={key}>
                                            <Dropdown.Item
                                                eventKey={`${key}`}
                                                onClick={() => handleAddSongToMyPlayList(song, value._id)}
                                            >
                                                {value.name}
                                            </Dropdown.Item>
                                        </div>

                                    ))}
                                    <Dropdown.Divider/>
                                    <Dropdown.Item
                                        eventKey="4"
                                        onClick={() => handleAddToPlayer(song)}
                                        //裴 onClick={()=>handleAddToPlayer(song._id, song.singer, song.name)}
                                    >
                                        Current playlist
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="5"
                                        onClick={() => handleAddToTemporaryList(song)}
                                    >
                                        Temporary playlist
                                    </Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item
                                        eventKey="6"

                                    >
                                        Song information
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="7"
                                        onClick={()=> handleShowSingers(song)}
                                    >
                                        Singer information
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="8"
                                        onClick={()=>handleGoToAlbum(song.album)}
                                    >
                                        Album information
                                    </Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <div>
                <SingerSelectionDialog show={show} onHide={() => setShow(false)} song={selectedSong}/>
            </div>
            {isLoading && (
                <div style={{}}>
                    <Spinner
                        animation="border"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>

            )}
        </>
    )
}

function SingerSelectionDialog(props){
    const history = useNavigate()
    function handleGoToSinger(singer) {
        // console.log(singer)
        history("/singer/"+singer)
    }

    return (
        {...props.song === undefined?(
            <></>
            ):(
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {props.song.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Author</h3>
                        {
                            props.song.singer.map((value,key)=>(
                                <Button key={key} onClick={()=>handleGoToSinger(value.id)}>{value.name}</Button>
                            ))
                        }
                    </Modal.Body>

                </Modal>
            )}

    )
}

export default SongList

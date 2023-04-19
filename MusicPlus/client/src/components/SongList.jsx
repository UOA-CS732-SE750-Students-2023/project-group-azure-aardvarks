import Table from "react-bootstrap/Table";
import React, {useContext, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import {DropdownButton} from "react-bootstrap";
import axios from "axios";
import {BACKEND_API} from "../utils/env.js";
import PlayerContext from "../utils/AppContextProvider.jsx";


function SongList({songList}) {
    const {currentPlayList,setCurrentPlayList} = useContext(PlayerContext);
    async function handleAddToPlayer(song){
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

        const lyricResponse = await fetch(
            "http://127.0.0.1:3000/api/music/lyric/" + song._id
        );
        let lyricData = await lyricResponse.json();
        const songFile = await fetch("http://127.0.0.1:3000/api/music/play/" + song._id)
        let songData = await songFile.blob()
        songData=URL.createObjectURL(songData)
        let formattedSinger = ''
        for (const i in song.singer) {
            formattedSinger = song.singer[i].name + '/'
        }
        formattedSinger = formattedSinger.substring(0,formattedSinger.length-1)
        const musicDetail ={
            _id: song._id,
            name: song.name,
            singer: formattedSinger,
            cover: song.album.picUrl,
            musicSrc: songData,
            lyric: lyricData.data,
        }
        setCurrentPlayList([...currentPlayList,musicDetail])


    }



    return (
        <>
            <div style={{paddingBottom: 15}}>
                <Button variant="light"
                        style={{
                            borderRadius: 25,
                            borderColor: "gray"
                        }}
                >+ Add</Button>
            </div>
            <div>
                <Table striped bordered hover>
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
                        <tr key={song._id}>
                            <td>{index + 1}</td>
                            <td>{song.name}</td>
                            <td>{song.singer.map((singer, index) => (singer.name))}</td>
                            <td>{song.album.name}</td>
                            {/*<td>{song.style.name}</td>*/}
                            <td style={{width:100}}>
                                <DropdownButton
                                    align="end"
                                    title="+ Add"
                                    id="dropdown-menu-align-end"
                                    size={"sm"}
                                    variant="outline-secondary"
                                >
                                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        eventKey="4"
                                        onClick={()=>handleAddToPlayer(song)}
                                        //裴 onClick={()=>handleAddToPlayer(song._id, song.singer, song.name)}
                                    >
                                        Current playlist
                                    </Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>

    )
}

export default SongList
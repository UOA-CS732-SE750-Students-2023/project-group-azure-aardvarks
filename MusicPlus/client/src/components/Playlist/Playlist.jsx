import React, {useContext, useEffect, useState} from "react";
import {Button, ButtonGroup, DropdownButton, Modal} from "react-bootstrap";
import {NotificationContext, UserContext} from "../../utils/AppContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import './index.css'
import {Accordion} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import PlaylistTemplate from "./PlaylistTemplate.jsx";
function Playlist(){
    const {userPlaylist, userDetail, deleteUserPlaylist} = useContext(UserContext);
    const {addToast} = useContext(NotificationContext)
    const Navigate = useNavigate();
    const [showNewPlaylist, setShowNewPlaylist] = useState(false);
    const [showEditPlaylist, setShowEditPlaylist] = useState(false);
    const [currentPlaylistName, setCurrentPlaylistName] = useState('');
    const [currentPlaylistId, setCurrentPlaylistId] = useState('');
    const [currentPlaylistPrivate, setCurrentPlaylistPrivate] = useState();
    const [currentPlaylistDescription, setCurrentPlaylistDescription] = useState('');
    const [currentPlaylistCover, setCurrentPlaylistCover] = useState('');
    const handleShowEditPlaylist = () => setShowEditPlaylist(true);
    const handleShowNewPlaylist = () => setShowNewPlaylist(true);
    async function handleDeletePlaylist(playlist, position){
        const url = window.location.href
        const parts = url.split('/');
        const lastPart = parts.pop();
        if (userPlaylist[position]._id === lastPart){
           Navigate('/home')
        }
        await deleteUserPlaylist(playlist._id) // redirect
        addToast(`delete "${playlist.name}" successfully`)
    }
    async function handleEditPlaylist(playlist, key){
        setCurrentPlaylistName(playlist.name)
        if (playlist.private === undefined){
            setCurrentPlaylistPrivate(playlist.private)
        }else{
            setCurrentPlaylistPrivate(playlist.private.toString())
        }

        setCurrentPlaylistId(playlist._id)
        setCurrentPlaylistDescription(playlist.description)
        setCurrentPlaylistCover(playlist.cover)
        handleShowEditPlaylist()
        console.log("description\n"+playlist)
        console.log(userPlaylist)
    }

    useEffect(()=>{}, [userPlaylist])
    return (
        <>
        <div>
            {userDetail.username===undefined?(<></>):(
                <div className={"playlist"} >
                    <Accordion defaultActiveKey={['0']} alwaysOpen className={'playlist-container'} >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><b>My playlists</b></Accordion.Header>
                            <Accordion.Body>
                                <div>
                                    {userPlaylist.map((value, i)=>(
                                        <div  key={i}>
                                            {/*<Link to={`/playlist/${value._id}`}><Button variant={"light"}>{value.name}</Button></Link>*/}
                                            <Button
                                                variant="light"
                                                type="button"
                                                onClick={() => {Navigate(`/playlist/${value._id}`);}}
                                                style={{width:"100%"}}
                                            >
                                                {value.name}
                                            </Button>
                                        </div>
                                    ))}
                                    <hr/>
                                    <div>
                                        <Button
                                            variant="light"
                                            onClick={handleShowNewPlaylist}
                                            style={{width:"100%"}}
                                        >
                                            New Playlist
                                        </Button>
                                    </div>
                                    {/*<hr/>*/}
                                    {/*<div>*/}
                                    {/*    <DropdownButton*/}
                                    {/*        as={ButtonGroup}*/}
                                    {/*        title="delete"*/}
                                    {/*        id="bg-vertical-dropdown-2"*/}
                                    {/*        style={{width:"100%"}}*/}
                                    {/*    >*/}
                                    {/*        {userPlaylist.map((value, key)=>(*/}
                                    {/*            <Dropdown.Item*/}
                                    {/*                eventKey="2"*/}
                                    {/*                key={key}*/}
                                    {/*                onClick={()=>handleDeletePlaylist(value, key)}*/}
                                    {/*            >*/}
                                    {/*                {value.name}*/}
                                    {/*            </Dropdown.Item>*/}
                                    {/*        ))}*/}
                                    {/*    </DropdownButton>*/}
                                    {/*</div>*/}
                                    {/*<hr/>*/}
                                    {/*<div>*/}
                                    {/*    <DropdownButton*/}
                                    {/*        as={ButtonGroup}*/}
                                    {/*        title="edit"*/}
                                    {/*        id="bg-vertical-dropdown-2"*/}
                                    {/*        style={{width:"100%"}}*/}
                                    {/*    >*/}
                                    {/*        {userPlaylist.map((value, key)=>(*/}
                                    {/*            <Dropdown.Item*/}
                                    {/*                eventKey="2"*/}
                                    {/*                key={key}*/}
                                    {/*                onClick={()=>handleEditPlaylist(value, key)}*/}
                                    {/*            >*/}
                                    {/*                {value.name}*/}
                                    {/*            </Dropdown.Item>*/}
                                    {/*        ))}*/}
                                    {/*    </DropdownButton>*/}
                                    {/*</div>*/}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <PlaylistTemplate
                        show={showNewPlaylist}
                        onClose={()=>setShowNewPlaylist(false)}
                        type={"new"}
                    />
                </div>
            )}
        </div>
        <br/>
        <div>
            {userDetail.username===undefined?(<></>):(
                <div className={"playlist"}>
                    <Accordion defaultActiveKey={['0']} alwaysOpen  className={'playlist-container'}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><b>Setting</b></Accordion.Header>
                            <Accordion.Body>
                                <div>
                                    <DropdownButton
                                        as={ButtonGroup}
                                        title="delete"
                                        id="bg-vertical-dropdown-2"
                                        style={{width:"100%"}}
                                        variant="light"
                                    >
                                        {userPlaylist.map((value, key)=>(
                                            <Dropdown.Item
                                                eventKey="2"
                                                key={key}
                                                onClick={()=>handleDeletePlaylist(value, key)}
                                            >
                                                {value.name}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </div>
                                <hr/>
                                <div>
                                    <DropdownButton
                                        as={ButtonGroup}
                                        title="edit"
                                        id="bg-vertical-dropdown-2"
                                        variant="light"
                                        style={{width:"100%"}}
                                    >
                                        {userPlaylist.map((value, key)=>(
                                            <Dropdown.Item
                                                eventKey="3"
                                                key={key}
                                                onClick={()=>handleEditPlaylist(value, key)}
                                            >
                                                {value.name}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <PlaylistTemplate
                        show={showEditPlaylist}

                        onClose={()=>setShowEditPlaylist(false)}
                        currentplaylistname={currentPlaylistName}
                        _id={currentPlaylistId}
                        currentplaylistprivate={currentPlaylistPrivate}
                        currentplaylistdescription={currentPlaylistDescription}
                        currentcover={currentPlaylistCover}
                        type={"edit"}
                    />
                </div>
            )}
        </div>
        </>
    )
}

export default Playlist

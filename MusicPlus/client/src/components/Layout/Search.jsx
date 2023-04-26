import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "./index.css"
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/AppContextProvider.jsx";
import axios from "axios";
import { BACKEND_API } from "../../utils/env.js";
import Toast from "react-bootstrap/Toast";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import NewPlaylistPage from './NewPlaylistPage';




export default function Search() {
    const [showNewPlaylist, setShowNewPlaylist] = useState(false);
    const handleNewPlaylistClick = () => {
        setShowNewPlaylist(true);
    };

    useEffect(() => {
        const storedShowNewPlaylist = localStorage.getItem('showNewPlaylist');
        if (storedShowNewPlaylist !== null) {
          setShowNewPlaylist(JSON.parse(storedShowNewPlaylist));
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('showNewPlaylist', JSON.stringify(showNewPlaylist));
      }, [showNewPlaylist]);
    
    const { userPlaylist } = useContext(UserContext);
    const Navigate = useNavigate();
    return (
        <>
            <div id="cover" className={"mt-4"}>
                <form method="get" action="">
                    <div className="tb">
                        <div className="td"> <input className={"input_style"} type="text" placeholder="Search" /> </div>
                        <div className="td" id="s-cover">
                            <button type="submit" className={"button_style"}>
                                <div id="s-circle"></div>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Row>
                <div className="wrap mt-4">
                    <Link to={'/home'}><button className="button">home</button></Link>

                </div>
            </Row>
            <Row>
                <div className="wrap mt-4 mb-4">
                    <Link to={'/preference'}><button className="button">Random Recommendation</button></Link>
                </div>
            </Row>
            <hr />
            <Row>
                <div className="wrap mt-4">
                    <Link to={'/like'}><button className="button">Like</button></Link>
                </div>
            </Row>
            <Row>
                <div className="wrap mt-4 mb-4">
                    <Link to={'/collection'}><button className="button">Collection</button></Link>
                </div>
            </Row>
            <hr />
            {showNewPlaylist && (
                
                <Link to={"/newplaylistpage"} style={{ paddingLeft: '20px' }}>
                    <button className="button">New Song List</button>
                </Link>
            )}
            <Row>
                <div className="wrap mt-4 mb-4">
                    <button style={{ fontWeight: "bold", fontSize: '20px', width: '60px' }} className="button" onClick={handleNewPlaylistClick}>+</button>
                </div>
            </Row>
            
            <Row>
                {userPlaylist.map((value, i) => (
                    <div className="wrap mt-4" key={i}>
                        {/*<Link to={`/playlist/${value._id}`}><Button variant={"light"}>{value.name}</Button></Link>*/}
                        <Button variant="light" type="button" onClick={() => { Navigate(`/playlist/${value._id}`); }}>
                            {value.name}
                        </Button>
                    </div>
                ))}
            </Row>
        </>
    )
}



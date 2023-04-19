import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "./index.css"
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../utils/AppContextProvider.jsx";
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import Toast from "react-bootstrap/Toast";
import {Button} from "react-bootstrap";


export default function Search(){
    const {userPlaylist} = useContext(UserContext);

    return(
        <>
            <div id="cover" className={"mt-4"}>
                <form method="get" action="">
                    <div className="tb">
                        <div className="td"> <input className={"input_style"} type="text" placeholder="Search"/> </div>
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
            <hr/>
            <Row>
                {userPlaylist.map((value, i)=>(
                    <div className="wrap mt-4" key={i}>
                        {/*<Link to={`/playlist/${value._id}`}><Button variant={"light"}>{value.name}</Button></Link>*/}
                        <PlayListButton to={`/playlist/${value._id}`} name={value.name}></PlayListButton>
                    </div>
                ))}
            </Row>
        </>
    )
}

function PlayListButton({to, name}){
    return (
        <>
            <Link to={to}><Button variant={"light"} type={"button"}>{name}</Button></Link>
        </>
    )
}
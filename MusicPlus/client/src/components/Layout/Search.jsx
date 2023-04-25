import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "./index.css"
import {Link, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {NotificationContext, UserContext} from "../../utils/AppContextProvider.jsx";
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import Toast from "react-bootstrap/Toast";
import { useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap";


export default function Search(){
    const {userPlaylist} = useContext(UserContext);

    const Navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const {addToast} = useContext(NotificationContext);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch=()=>{
        if (inputValue !== ''){
            Navigate(`/search?keyword=${inputValue}`);
        }
        else{
            addToast("your input can not be empty")
        }
    }

    return(
        <>
            <div id="cover" className={"mt-4"}>
                <form method="get">
                    <div className="tb">
                        <div className="td">
                            {/*<input className={"input_style"} type="text" placeholder="Search" value={inputValue} onChange={handleInputChange}/>*/}
                            <input className={"input_style"} type="text" placeholder="Search" value={inputValue} onChange={handleInputChange}/>
                        </div>
                        <div className="td" id="s-cover">
                            {/*<button type="submit" className={"button_style"} onClick={() => {Navigate(`/search/${inputValue}`);}}>*/}
                            <button type="submit" className={"button_style"} onClick={handleSearch}>
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
            <hr/>
            <Row>
                {userPlaylist.map((value, i)=>(
                    <div className="wrap mt-4" key={i}>
                        {/*<Link to={`/playlist/${value._id}`}><Button variant={"light"}>{value.name}</Button></Link>*/}
                        <Button variant="light" type="button" onClick={() => {Navigate(`/playlist/${value._id}`);}}>
                            {value.name}
                        </Button>
                    </div>
                ))}
            </Row>
        </>
    )
}



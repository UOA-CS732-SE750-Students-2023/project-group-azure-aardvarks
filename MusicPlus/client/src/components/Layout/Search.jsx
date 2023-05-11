import Row from 'react-bootstrap/Row';
import "./index.css"
import {Link, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {NotificationContext, UserContext} from "../../utils/AppContextProvider.jsx";
import { useNavigate } from 'react-router-dom';
import Playlist from "../Playlist/Playlist.jsx";


export default function Search(){


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
                <Playlist/>
            </Row>
        </>
    )
}



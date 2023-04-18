import {Route, Routes} from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
// import PlayerContext from "../utils/AppContextProvider.jsx";
import Home from "../components/HomePage/Home.jsx";
import Login from "../components/LoginPage/Login.jsx";
import NotFount from "../pages/404.jsx";
import Register from "../components/LoginPage/Register";
import Player from "../components/Layout/Player.jsx";
import {useState} from "react";
import HomeWithPlayerContext from "../components/HomePage/Home.jsx";
import PlaylistCover from "../components/Playlist/PlaylistCover.jsx";
import PlaylistContent from "../components/Playlist/PlaylistContent.jsx";
import PlayerContext from "../utils/AppContextProvider.jsx"


function RouterFunc() {
    // const [showPlayer, setShowPlayer] = useState(false);
    // const [currentPlayList, setCurrentPlayList] = useState([])
    return (
        // <PlayerContext.Provider value={{ showPlayer, setShowPlayer,currentPlayList, setCurrentPlayList }}>
            <Routes >
                <Route path={"/register"} element={<Register/>}/>
                <Route index path="/home" element={<HomeWithPlayerContext/>} exact/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path="/playlist/:id" element={<PlaylistContent/>} />

                <Route path={"*"} element={<NotFount/>}/>
            </Routes>

        //     {showPlayer && <Player />}
        // </PlayerContext.Provider>
    )
}

export default RouterFunc

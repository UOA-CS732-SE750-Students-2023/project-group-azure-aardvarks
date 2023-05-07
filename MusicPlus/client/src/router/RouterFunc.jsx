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
import UserDetail from "../components/LoginPage/UserDetail.jsx";
import Result from "../components/searchResult/Result";
import AlbumContent from "../components/Album/AlbumContent";
import SingerContent from "../components/Singer/SingerContent";
import SongContent from "../components/Song/SongContent";
import Profile from "../components/User/Profile.jsx";


function RouterFunc() {
    // const [showPlayer, setShowPlayer] = useState(false);
    // const [currentPlayList, setCurrentPlayList] = useState([])
    return (
        // <PlayerContext.Provider value={{ showPlayer, setShowPlayer,currentPlayList, setCurrentPlayList }}>
            <Routes >
                <Route path="/" element={<HomeWithPlayerContext />}></Route>
                <Route path={"/register"} element={<Register/>}/>
                <Route index path="/home" element={<HomeWithPlayerContext/>} exact/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path="/playlist/:id" element={<PlaylistContent link={"/playList/searchPlayListById"}/>} />
                <Route path="/preference" element={<PlaylistContent link={"/style/preference"}/>} />
                {/* <Route path="/user/detail" element={<UserDetail />} /> */}
                <Route path="/user/detail" element={<Profile />} />
                {/*<Route path="/search/:input" element={<Result />} />*/}
                <Route path="/search" element={<Result />} />
                <Route path="/album/:id" element={<AlbumContent />} />
                <Route path="/singer/:id" element={<SingerContent />} />
                <Route path="/song" element={<SongContent />} />

                <Route path={"*"} element={<NotFount/>}/>
            </Routes>

        //     {showPlayer && <Player />}
        // </PlayerContext.Provider>
    )
}

export default RouterFunc

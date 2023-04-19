import React, {useState, useEffect, useContext} from "react";
import Cookies from 'js-cookie';
import b from "../static/b.mp3";
import Player from "../components/Layout/Player.jsx";
import axios from "axios";
import PlayListNotification from "../components/Notification/PlayListNotification.jsx";
import TemporaryPlayList from "../components/Playlist/TemporaryPlayList.jsx";
import {audioStreamToBlob, fetchSongDetailsAsync, formatDateTime, formatSinger} from "./commentUtils.js";
import {BACKEND_API} from "./env.js";
const backendAPI = import.meta.env.VITE_BACKEND_BASE_URL;
// Manage the user's status
export const UserContext = React.createContext({})
// Sending a notification
export const NotificationContext = React.createContext([])
// Manage the temporary Playlist
export const TemporaryPlayListContext = React.createContext([])
const PlayerContext = React.createContext({
    // showPlayer: false,
    // setShowPlayer: () => {},
});

export default PlayerContext;


/**
 * Put it to the Root component. Global user status management.
 * @param children  Root entry
 * @returns {JSX.Element}
 */
export function UserProvider({ children }) {
    const [userDetail, setUserDetail] = useState({});
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 30);
    const setCookieUserDetail = (detail) => {
        setUserDetail(detail);
        Cookies.set('userDetail', JSON.stringify({_id: detail._id, username: detail.username, password: detail.password}), { expires: expiresDate }); // 有效期为30天
    };

    useEffect(() => {
        const fetchUserDetail = async () => {
            const cookieUserDetail = Cookies.get('userDetail');

            if (cookieUserDetail) {
                const parsedUserDetail = JSON.parse(cookieUserDetail);
                const detail = await axios.get(`${backendAPI}/api/user/logIn`, {
                    headers: {
                        'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                        'Authorization': 'Basic ' + btoa(`${parsedUserDetail.username}:${parsedUserDetail.password}`),
                    },
                });
                setUserDetail(detail.data.data);
            }
        };

        fetchUserDetail();
    }, []);

    const context = {
        userDetail,
        setUserDetail: setCookieUserDetail,
    };

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    );
}

/**
 * Put it to the Root component. Global Music Player status management.
 * @param children  Root entry
 * @returns {JSX.Element}
 */
export function PlayerProvider({children}){
    // use fake data, delete this at the end
    const [currentPlayList, setCurrentPlayList] = useState([{
        name: "b",
        singer: "b",
        musicSrc: b
    }])
    const [showPlayer, setShowPlayer] = useState(false);


    const context = {
        currentPlayList, setCurrentPlayList, showPlayer, setShowPlayer
    }
    return (
        <PlayerContext.Provider value={context}>
            {children}
            {showPlayer && <Player />}
        </PlayerContext.Provider>
    )
}


export function NotificationProvider({children}){
    const [show, setShow] = useState(true);
    const [notification, setNotification] = useState({
        show:true,
        header:"",
        time:"",
        content:""
    })
    const deleteNotification = () =>{
        console.log(1)
    }
    const context = {
        show, setShow,deleteNotification
    }
    return (
        <NotificationContext.Provider value={context}>
            {children}
            {<PlayListNotification/>}
        </NotificationContext.Provider>
    )
}


export function TemporaryPlaylistProvider({children}){
    const [show, setShow] = useState(false);
    const [songList, setSongList] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(formatDateTime(new Date()));
    const [temporaryPlaylistDetail, setTemporaryPlaylistDetail] = useState('');
    const {currentPlayList, setCurrentPlayList} = useContext(PlayerContext);
    const removeTemporaryPlaylist = () =>{
        setShow(false)
        setSongList([])
        setTemporaryPlaylistDetail([])
    }
    const addToCurrentPlaylist = async () =>{
        const result = []

        for (const i in songList) {
            const request = await fetchSongDetailsAsync(songList[i]._id)
            const lyric = request.lyric
            const audioStream = request.audioStream

            console.log(lyric)
            const musicSrc = audioStreamToBlob(audioStream)
            const musicDetail = {
                _id:songList[i]._id,
                name:songList[i].name,
                cover:songList[i].album.picUrl,
                musicSrc:musicSrc,
                lyric:lyric.data.data
            }
            // React 函数式更新(Functional updates)， 不会改变之前的状态，而是通过创建新的数组实现状态更新，这有助于避免副作用带来的各种问题
            setCurrentPlayList(prevList => [...prevList, musicDetail])
            // setCurrentPlayList([...currentPlayList, musicDetail])
        }



    }
    const showTemporaryPlaylist = () =>{
        setShow(true)
    }
    const addToTemporaryPlaylist = (song)=>{
        setSongList([...songList, song])
        setTemporaryPlaylistDetail(`${temporaryPlaylistDetail}  ${song.name}`)
        setLastUpdate(formatDateTime(new Date()))
        showTemporaryPlaylist()
    }

    const context = {
        removeTemporaryPlaylist,
        addToCurrentPlaylist,
        showTemporaryPlaylist,
        addToTemporaryPlaylist,
        show,
        lastUpdate,
        temporaryPlaylistDetail
    }
    return (
        <TemporaryPlayListContext.Provider value={context}>
            {children}
            {<TemporaryPlayList/>}
        </TemporaryPlayListContext.Provider>
    )
}
import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import b from "../static/b.mp3";
import Player from "../components/Layout/Player.jsx";

// Manage the user's status
export const UserContext = React.createContext({})


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
        Cookies.set('userDetail', JSON.stringify(detail), { expires: expiresDate }); // 有效期为30天
    };

    useEffect(() => {
        const cookieUserDetail = Cookies.get('userDetail');
        if (cookieUserDetail) {
            setUserDetail(JSON.parse(cookieUserDetail));
        }
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
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import b from '../../static/b.mp3'
import {useContext, useEffect, useState} from "react";
import PlayerContext from "../../utils/AppContextProvider.jsx";







function Player() {
    // newPlaylist();
    const [audioLists, setAudioLists] = useState([])

    const {currentPlayList} = useContext(PlayerContext)

    function handleAudioListChange(){
        console.log(1)
    }
    return (
        <div className="App">
            {/*<LoadPlaylistButton setAudioLists={setAudioLists} />*/}
            <ReactJkMusicPlayer
                quietUpdate
                clearPriorAudioLists
                glassBg
                audioLists={currentPlayList}
                showMediaSession
                preload = {true}
                autoPlay={false}
                theme="auto"
                showLyric={true}
                showDownload={false}
                mode="full"

                // Change the Destroy function as a Show comment function
                showDestroy={true}
                onAudioListsChange={()=>{
                    handleAudioListChange()
                }}
            />
        </div>
    );
}
export default Player;

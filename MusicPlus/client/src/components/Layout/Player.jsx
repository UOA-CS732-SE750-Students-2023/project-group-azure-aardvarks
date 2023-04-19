import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import b from '../../static/b.mp3'
import {useContext, useEffect, useState} from "react";
import PlayerContext from "../../utils/AppContextProvider.jsx";







function Player() {
    // newPlaylist();

    const {currentPlayList,setCurrentPlayList } = useContext(PlayerContext)

    function handleAudioListChange(currentPlayId,audioLists,audioInfo){
        setCurrentPlayList(audioLists)
        //console.log(audioLists)
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
                onAudioListsChange={(currentPlayId,audioLists,audioInfo)=>{
                    handleAudioListChange(currentPlayId,audioLists,audioInfo)
                }}
            />
        </div>
    );
}
export default Player;

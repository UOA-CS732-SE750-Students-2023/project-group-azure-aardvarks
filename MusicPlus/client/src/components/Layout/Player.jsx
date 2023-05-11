import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import {useContext, useEffect, useRef, useState} from "react";
import PlayerContext, {UserContext} from "../../utils/AppContextProvider.jsx";
import {BACKEND_API} from "../../utils/env.js";







function Player() {
    const [audioInstance, setAudioInstance] = useState(null);
    const playerRef = useRef(null);
    // newPlaylist();
    const {userDetail, setUserDetail} = useContext(UserContext)
    const {currentPlayList,setCurrentPlayList } = useContext(PlayerContext)

    function handleAudioListChange(currentPlayId,audioLists,audioInfo){
        console.log(audioLists)
        setCurrentPlayList(audioLists)
        if (audioLists){
            if (audioLists.length === 1){
                playerRef.current.updatePlayIndex(0)
            }
        }


    }
    async function handleAudioEnded(currentPlayId, audioLists, audioInfo) {

        if (audioInfo.style) {
            try {
                if (audioInfo.style.id !== "null" && audioInfo.style.id !== null){
                    const response = await fetch(`${BACKEND_API}/api/style/setPreference/`+audioInfo.style.id, {
                        method: 'POST', // 指定请求方法为POST
                        headers: {
                            'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                            'Authorization': 'Basic ' + btoa(`${userDetail.username}:${userDetail.password}`)
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const responseData = await response.json(); // 假设服务器返回的是JSON格式数据
                    setUserDetail(responseData.data)
                }


            } catch (error) {
                console.error('Error posting data:', error);
            }
        }

    }

    return (
        <div className="App">
            {/*<LoadPlaylistButton setAudioLists={setAudioLists} />*/}
            <ReactJkMusicPlayer
                getAudioInstance={(instance) => {
                    setAudioInstance(instance);
                }}
                quietUpdate
                clearPriorAudioLists
                glassBg
                audioLists={currentPlayList}
                showMediaSession
                preload = {true}
                autoPlay={true}
                theme="auto"
                showLyric={true}
                ref={playerRef}
                showDownload={false}
                mode="full"

                // Change the Destroy function as a Show comment function
                showDestroy={true}
                onAudioListsChange={(currentPlayId,audioLists,audioInfo)=>{
                    handleAudioListChange(currentPlayId,audioLists,audioInfo)
                }}
                onAudioEnded={(currentPlayId,audioLists,audioInfo)=>{
                    handleAudioEnded(currentPlayId,audioLists,audioInfo)
                }}
            />
            {/*{audioInstance && (*/}
            {/*    <>*/}
            {/*        <button onClick={() => audioInstance.play()}>play</button>*/}
            {/*        <button onClick={() => audioInstance.pause()}>pause</button>*/}
            {/*        <button onClick={playerRef.current.load}>reload</button>*/}
            {/*        <button onClick={() => (audioInstance.currentTime = 40)}>*/}
            {/*            change current play time*/}
            {/*        </button>*/}
            {/*        <button onClick={() => (audioInstance.playbackRate = 2)}>*/}
            {/*            change play back rate*/}
            {/*        </button>*/}
            {/*        <button onClick={() => (audioInstance.volume = 0.2)}>*/}
            {/*            change volume*/}
            {/*        </button>*/}
            {/*        <button onClick={() => audioInstance.destroy()}>*/}
            {/*            destroy player*/}
            {/*        </button>*/}
            {/*        <button onClick={() => playerRef.audio.togglePlay}>toggle play</button>*/}
            {/*        <button onClick={() => playerRef.current.audio.clear}>clear audio lists</button>*/}
            {/*        <button onClick={() => playerRef.current.audio.playNext()}>play next</button>*/}
            {/*        <button onClick={() => playerRef.current.audio.playPrev()}>play prev</button>*/}
            {/*        <button onClick={() => playerRef.current.audio.playByIndex(1)}>*/}
            {/*            play by index1*/}
            {/*        </button>*/}
            {/*        <button onClick={() => playerRef.current.audio.playByIndex(0)}>*/}
            {/*            play by index0*/}
            {/*        </button>*/}
            {/*        <button onClick={() => playerRef.current.updatePlayIndex(1)}>*/}
            {/*            update play index*/}
            {/*        </button>*/}
            {/*    </>*/}
            {/*)}*/}
        </div>

    );
}
export default Player;

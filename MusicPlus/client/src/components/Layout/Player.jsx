import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import b from '../../static/b.mp3'
import {useContext, useEffect, useState} from "react";
import PlayerContext, {UserContext} from "../../utils/AppContextProvider.jsx";







function Player() {
    // newPlaylist();
    const {userDetail, setUserDetail} = useContext(UserContext)
    const {currentPlayList,setCurrentPlayList } = useContext(PlayerContext)

    function handleAudioListChange(currentPlayId,audioLists,audioInfo){
        setCurrentPlayList(audioLists)
        //console.log(audioLists)
    }
    async function handleAudioEnded(currentPlayId, audioLists, audioInfo) {
        if (audioInfo.style) {
            try {
                const response = await fetch("http://127.0.0.1:3000/api/style/setPreference/"+audioInfo.style.id, {
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

            } catch (error) {
                console.error('Error posting data:', error);
            }
        }

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
                onAudioEnded={(currentPlayId,audioLists,audioInfo)=>{
                    handleAudioEnded(currentPlayId,audioLists,audioInfo)
                }}
            />
        </div>
    );
}
export default Player;

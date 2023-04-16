import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import b from '../../static/b.mp3'
import {useState} from "react";

let playlistId;

async function newPlaylist() {
    try {
        const response = await fetch("http://127.0.0.1:3000/api/playList/newPlayList", {
            method: 'POST', // 指定请求方法为POST
            headers: {
                'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                'Authorization': 'Basic ' + btoa('dxh000130' + ":" + 'duan002349')
            },
            body: JSON.stringify({
                "name": "test",
                "private" : false,
                "songs" : ["1974443814","1974443815","1974443816","1974443817"]

            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json(); // 假设服务器返回的是JSON格式数据
        playlistId = responseData.data._id
        return responseData;
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

function LoadPlaylistButton({ setAudioLists }) {
    const getPlayList = async () => {
        try{
            const songSearchResponse = await fetch(
                "http://127.0.0.1:3000/api/playList/searchPlayListById/"+playlistId
            );
            let songSearchData = await songSearchResponse.json();

            console.log("Search", songSearchData);
            songSearchData = songSearchData.data[0].songs;

            for (let song in songSearchData) {
                const lyricResponse = await fetch(
                    "http://127.0.0.1:3000/api/music/lyric/" + song
                );
                let lyricData = await lyricResponse.json();
                const songFile = await fetch("http://127.0.0.1:3000/api/music/play/" + song)
                let songData = await songFile.blob()
                songData=URL.createObjectURL(songData);
                console.log(songData)
                setAudioLists((prevAudioLists) => [
                    ...prevAudioLists,
                    {
                        _id: song,
                        name: songSearchData[song].name,
                        singer: songSearchData[song].singer[0].name,
                        cover: songSearchData[song].picUrl,
                        musicSrc: songData,
                        lyric: lyricData.data,
                    },
                ]);
            }
        }
        catch (e) {
            console.log(e)
        }
    };

    return <button onClick={getPlayList}>Load PlayList</button>;
}

function Player() {
    newPlaylist();
    const [audioLists, setAudioLists] = useState([{
        name: "b",
        singer: "b",
        musicSrc: b
    }])

    return (
        <div className="App">
            <LoadPlaylistButton setAudioLists={setAudioLists} />
            <ReactJkMusicPlayer
                quietUpdate
                clearPriorAudioLists
                glassBg
                audioLists={audioLists}
                showMediaSession
                preload = {true}
                autoPlay={false}
                theme="auto"
                showLyric={true}
                showDownload={false}
                mode="full"
            />
        </div>
    );
}
export default Player;

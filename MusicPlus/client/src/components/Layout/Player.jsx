import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import b from '../../static/b.mp3'
import {useState} from "react";


function LoadPlaylistButton({ setAudioLists }) {
    const getPlayList = async () => {
        const songSearchResponse = await fetch(
            "http://127.0.0.1:3000/api/playList/searchPlayListById/6436761b8ef88a8a1f6828b5"
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
    };

    return <button onClick={getPlayList}>Load PlayList</button>;
}

function Player() {
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

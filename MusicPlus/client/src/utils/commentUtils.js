import axios from "axios";
import {BACKEND_API} from "./env.js";

/**
 * Use song id to get "lyric", "detail","audioStream", "image" of a song
 * This is a parallel method in axios
 * @param songId required
 * @return eg
 *     {
 *         "lyric":result[0],
 *         "detail":result[1],
 *         "audioStream":result[2],
 *         "image":result[3]
 *     }
 */
export async function fetchSongDetailsAsync(songId){
    const requests = [
        axios.get(`${BACKEND_API}/api/music/lyric/${songId}`),
        // axios.get(`${BACKEND_API}/api/music/detail/${songId}`),
        axios.get(`${BACKEND_API}/api/music/play/${songId}`, { responseType: 'arraybuffer' }),
        // axios.get(`${BACKEND_API}/api/music/image/${songId}`),
    ]

    const result = await axios.all(requests)
    return {
        "lyric":result[0],
        // "detail":result[1],
        "audioStream":result[1],
        // "image":result[2]
    }
}

/**
 * After you use axios to get a Arraybuffer  eg await axios.get(`${BACKEND_API}/api/music/play/${id}`, { responseType: 'arraybuffer' })
 * you can use "audioStreamToBlob" to get the audio blob file
 * @param audioStream
 * @return {string}
 */
export function audioStreamToBlob(audioStream){
    const uint8Array = new Uint8Array(audioStream.data);
    const blob = new Blob([uint8Array], {type: "audio/mp3"});
    const musicSrc = URL.createObjectURL(blob);
    return musicSrc
}

/**
 * format date
 * @param date Date() type
 * @return {string} 2323-10-10 23:23:00
 */
export function formatDateTime(date) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const [
        { value: month },,
        { value: day },,
        { value: year },,
        { value: hour },,
        { value: minute },,
        { value: second },,
    ] = formatter.formatToParts(date);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

/**
 * @param singerList eg ["a", "b"]
 * @return {string} a/b
 */
export function formatSinger(singerList){
    let formattedSinger = ''
    for (const i in singerList) {
        formattedSinger = singerList[i].name + '/'
    }
    formattedSinger = formattedSinger.substring(0,formattedSinger.length-1)
    return formattedSinger
}


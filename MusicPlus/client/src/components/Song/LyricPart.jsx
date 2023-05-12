import {useEffect, useState, useRef} from "react";
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";

export default function LyricPart({id}){
    const [lyric, setLyric] = useState('')
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {

        const getResult = async () => {
            setIsLoading(true)
            try {
                await axios.get(`${BACKEND_API}/api/music/lyric/${id}`).then(
                    (response)=>{
                        setLyric(response.data.data)
                        setIsLoading(false);
                    }
                )
            } catch (error) {
                console.log(error);
            }
        };
        getResult()

    }, [id]);

    const regex = /\[\d{0,2}:\d{0,2}\.\d{0,2}\]?(.*)/g;
    const lyricList = [];

    let match;
    while ((match = regex.exec(lyric)) !== null) {
      const line = match[1].trim();
      const cleanLine = line.includes("]") ? line.substring(line.indexOf("]") + 1).trim() : line;
      lyricList.push(cleanLine);
    }

    return(
        <div className='mt-3 mb-3 me-1 ms-1'>
            {lyricList.map((line, index) => (
                <p key={index}>{line}<br/></p>
            ))}
        </div>
    )
}

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

    const regex = /\[\d{2}:\d{2}\.\d{2}\](.*)/g;
    const lyricList = [];

    let match;
    while ((match = regex.exec(lyric)) !== null) {
        lyricList.push(match[1]);
    }

    return(
        <div className='mt-3 mb-3 me-1 ms-1'>
            {lyricList.map((line, index) => (
                <p key={index}>{line}<br/></p>
            ))}
        </div>
    )
}

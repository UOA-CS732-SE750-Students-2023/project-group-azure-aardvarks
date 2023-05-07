import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import {UserContext} from "../../utils/AppContextProvider.jsx";

export default function CommentPart({songId, num}){

    const [loading, setIsLoading] = useState(true);
    const {userDetail, setUserDetail} = useContext(UserContext);
    const [comment, setComment] = useState([]);
    const [songComment, setSongComment] = useState([]);

    useEffect(() => {
        const getResult = async () => {
            setIsLoading(true)
            try {
                await axios.get(`${BACKEND_API}/api/comment/user/${userDetail._id}`).then(
                    (response)=>{
                        console.log(response.data.data.data)
                        setComment(response.data.data.data)
                        setIsLoading(false);
                    }
                )
            } catch (error) {
                console.log(error);
            }
        };
        getResult()

    }, [userDetail._id,num]);




    return(
        <>
            {loading?"loading...":
                comment.map((c,index)=>(
                    <p key={index}>{c.songId===songId?c.comment:""}</p>
                ))}

        </>
    )
}
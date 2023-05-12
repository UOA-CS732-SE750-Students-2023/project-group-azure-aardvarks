import { useContext, useEffect, useState } from "react";
import {Col, Row, Button, Modal, Card} from "react-bootstrap";
import axios from "axios";
import { BACKEND_API } from "../../utils/env.js";
import { UserContext } from "../../utils/AppContextProvider.jsx";
import { useLocation } from "react-router-dom";

export default function CommentPart({ songId, num }) {
  const [loading, setIsLoading] = useState(true);
  const { userDetail, setUserDetail } = useContext(UserContext);
  const [comment, setComment] = useState([]);
  const [likedComments, setLikedComments] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_API}/api/comment/user/${userDetail._id}`
        );
        console.log(response.data.data.data);
        setComment(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getResult();
  }, [userDetail._id, num]);

  useEffect(() => {
    const getLikedComments = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API}/api/comment/liked/${userDetail._id}`
        );
        setLikedComments(response.data);
      } catch (error) {
        console.error("Error fetching liked comments:", error);
      }
    };
    getLikedComments();
  }, [userDetail._id]);

  const handleLike = async (commentId) => {
    try {
      if (likedComments.includes(commentId)) {
        console.log("Already liked");
        return;
      }

      await axios.put(
        `${BACKEND_API}/api/comment/like/${commentId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(
              `${userDetail.username}:${userDetail.password}`
            )}`,
          },
        }
      );

      setLikedComments([...likedComments, commentId]);

      const updatedComments = comment.map((c) => {
        if (c._id === commentId) {
          return { ...c, likes: c.likes + 1 };
        }
        return c;
      });
      setComment(updatedComments);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  return (
    <div className="comment-container">
      <h3>Comments</h3>
      <div className="comment-section">
        {loading ? (
          <p>Loading...</p>
        ) : (
          comment.filter((c) => c.songId === songId).length > 0 ? (
            <ul>
              {comment
                .filter((c) => c.songId === songId)
                .map((c) => (
                  <div key={c.id} style={{display: "flex", alignItems: "center",textAlign:"center"}}>
                    <p><strong>{c.username}</strong> {c.comment}&nbsp;&nbsp;&nbsp;</p>
                    <Button
                      onClick={() => handleLike(c._id)}
                      disabled={likedComments.includes(c._id)}
                    >
                      Like ({c.likes})
                    </Button>
                  </div>
                ))}
            </ul>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )
        )}
      </div>
    </div>
  );
}

//     const [loading, setIsLoading] = useState(true);
//     const {userDetail, setUserDetail} = useContext(UserContext);
//     const [comment, setComment] = useState([]);
//     const [songComment, setSongComment] = useState([]);

//     useEffect(() => {
//         const getResult = async () => {
//             setIsLoading(true)
//             try {
//                 await axios.get(`${BACKEND_API}/api/comment/user/${userDetail._id}`).then(
//                     (response)=>{
//                         console.log(response.data.data.data)
//                         setComment(response.data.data.data)
//                         setIsLoading(false);
//                     }
//                 )
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         getResult()

//     }, [userDetail._id,num]);




//     return(
//         <>
//             {loading?"loading...":
//                 comment.map((c,index)=>(
//                     <p key={index}>{c.songId===songId?c.comment:""}</p>
//                 ))}

//         </>
//     )


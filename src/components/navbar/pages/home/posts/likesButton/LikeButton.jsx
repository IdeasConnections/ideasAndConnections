import React, { useEffect, useMemo, useState } from "react";
import './LikeButton.css'
import {AiOutlineLike, AiFillLike} from 'react-icons/ai'
import { useUserAuth } from "../../../../../../context/UserAuthContext";

export default function LikeButton ({userId, postId}) {
    const { likePost , getLikesByUser} = useUserAuth();

    const [likesCount, setLikesCount] = useState(0)
    const [liked, setLiked] = useState(false);
    const handleLike = () =>{
        likePost(userId, postId, liked)
    }

    useEffect(()=>{
        getLikesByUser(userId, postId, setLikesCount, setLiked)
    }, [userId, postId])

    console.log(likesCount)
    return(
        <div className="like-container" onClick={handleLike}> 
        {liked ? <AiFillLike size={25} color="blue"/> : <AiOutlineLike size={25}/>}
        <p>{liked ? 'Liked' : 'Like'}</p>
            {likesCount}
        </div>
    )
}
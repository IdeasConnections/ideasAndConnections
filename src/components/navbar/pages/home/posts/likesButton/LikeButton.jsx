import React, { useEffect, useMemo, useState } from "react";
import "./LikeButton.css";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import { useUserAuth } from "../../../../../../context/UserAuthContext";
import { getCurrentDateTimeStamp } from "../../../../../helpers/useMoment";

export default function LikeButton({ userId, postId }) {
  const { likePost, getLikesByUser, postComment, getComments, user } =
    useUserAuth();

  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const userName = `${user?.firstName} ${user?.lastName}` || user?.displayName;
  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  useEffect(() => {
    getLikesByUser(userId, postId, setLikesCount, setLiked);
    getComments(postId, setCommentList);
  }, [userId, postId]);

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentDateTimeStamp("ll"), userName);
    setComment("");
  };
  return (
    <div className="like-container">
      <p className="like-number"> {likesCount} people liked this post</p>
      <div>
        <hr />
      </div>

      <div className="like-comment">
        <div className="like-comment-inner" onClick={handleLike}>
          {liked ? (
            <AiFillLike size={25} color="#375aa0" />
          ) : (
            <AiOutlineLike size={25} />
          )}
          <p className={liked ? "blue" : "black"}>Like</p>
        </div>
        <div
          className="like-comment-inner"
          onClick={() => setShowCommentBox(true)}
        >
          <AiOutlineComment size={25} />
          <p className="">Comment</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button
            className="add-comment-btn"
            onClick={addComment}
            disabled={comment.length > 0 ? false : true}
          >
            Add Comment
          </button>
          {commentList.length > 0 ? (
            commentList.map((comment) => {
              return (
                <div className="all-comments">
                  <div className="all-comments-inner">
                    <p className="name">{comment.userName}</p>
                    <p className="comment">{comment.comment}</p>
                    {/* <p>●</p> */}
                    <p className="timestampPost">{comment.timeStamp}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

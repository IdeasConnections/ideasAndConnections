import React, { useEffect, useMemo, useState } from "react";
import "./LikeButton.css";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import { useUserAuth } from "../../../../../../context/UserAuthContext";
import { getCurrentDateTimeStamp } from "../../../../../helpers/useMoment";

export default function LikeButton({ userId, postId }) {
  const {
    likePost,
    getLikesByUser,
    postComment,
    getComments,
    user,
    getAllUsers,
  } = useUserAuth();

  const [likesCount, setLikesCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const userName = `${user?.firstName} ${user?.lastName}` || user?.displayName;
  const useruid = user?.uid;
  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  useEffect(() => {
    getLikesByUser(userId, postId, setLikesCount, setLiked);
    getComments(postId, setCommentList, setCommentCount);
  }, [userId, postId]);

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(
      postId,
      comment,
      getCurrentDateTimeStamp("ll"),
      userName,
      useruid
    );
    setComment("");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsersList(allUsers);
        console.log(
          "testt",
          usersList
            .filter((item) => item.uid === commentList.useruid)
            .map((item) => item.imageLink)
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  const filteredImages = usersList
    .filter((item) => item.uid === commentList.userId)
    .map((item) => item.imageLink);
  console.log(filteredImages, "filterimaghe");

  return (
    <div className="like-container">
      <div className="like-comment-count">
        <p className="like-number"> {likesCount} Likes - </p>
        <p className="like-number"> {commentCount} Comments</p>
      </div>

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
          onClick={() => setShowCommentBox(!showCommentBox)}
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
                    <div className="comment-img-wrapper">
                      <img
                        src={filteredImages[2] || defaultProfile}
                        className="comment-img"
                      />
                      <p className="name">{comment.userName}</p>
                    </div>

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

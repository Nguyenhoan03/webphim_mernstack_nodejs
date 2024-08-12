import React, { useState, useContext } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { userchildcomment, usercomment } from "../../services/Productservices";
import { HomeContext } from '../../store/HomeContext';
import "./Style.scss";

export default function CommentComponent({ comments, titlefilm }) {
  const { token } = useContext(HomeContext);
  const [contentcomment, setcontentcomment] = useState('');
  const [childcontentcomment, setchildcontentcomment] = useState('');
  const [replyParentId, setReplyParentId] = useState(null);

  const handlecomment = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Bạn cần đăng nhập để có thể bình luận");
    } else {
      try {
        await usercomment(token, titlefilm, contentcomment);
        setcontentcomment('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlereply = (key) => {
    setReplyParentId(key);
  };

  const handlechildcomment = async (e, parent_id) => {
    e.preventDefault();
    if (!token) {
      alert("Bạn cần đăng nhập để có thể bình luận");
    } else {
      try {
        await userchildcomment(token, titlefilm, childcontentcomment, parent_id);
        setchildcontentcomment('');
        setReplyParentId(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderComments = (comments, parentId = null) => {
    return comments
      .filter(comment => comment.parent_id === parentId)
      .map(comment => (
        <div key={comment.id} className={`comment${parentId ? " child-comment" : ""}`}>
          <div className="comment-header">
            <img
              className="avatar"
              src={`https://ui-avatars.com/api/?background=3f3f46&color=fff&name=${encodeURIComponent(comment.user_id)}`}
              alt=""
            />
            <div className="comment-meta">
              <p className="username">{comment.user_id}</p>
              <p className="comment-date">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="comment-body">
            <p>{comment.comment}</p>
          </div>
          <div className="reply-container">
            <p className="reply-button" onClick={() => handlereply(comment.id)}>
              <FiMessageSquare style={{ marginRight: "5px" }} /> Reply
            </p>
            {replyParentId === comment.id && (
              <form onSubmit={(e) => handlechildcomment(e, comment.id)}>
                <div className="reply-input-container">
                  <textarea
                    className="reply-input"
                    placeholder="Reply..."
                    required
                    value={childcontentcomment}
                    onChange={(e) => setchildcontentcomment(e.target.value)}
                  ></textarea>
                  <div className="button-container">
                    <button className="reply-button-submit">Reply</button>
                    <button
                      className="cancel-button"
                      onClick={() => setReplyParentId(null)}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
          {renderComments(comments, comment.id)}
        </div>
      ));
  };

  return (
    <div className="comment-section">
      <div className="comment-box">
        <div className="comment-input-container">
          <p className="comment-count">Bình luận ({comments?.length || 0})</p>
          <form onSubmit={handlecomment}>
            <textarea
              className="comment-input"
              value={contentcomment}
              onChange={(e) => setcontentcomment(e.target.value)}
              placeholder="Để lại bình luận ..."
              required
            ></textarea>
            <button className="comment-submit-button" type="submit">Bình luận</button>
          </form>
          {renderComments(comments)}
        </div>
      </div>
    </div>
  );
}

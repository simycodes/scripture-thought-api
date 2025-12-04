/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


const Comment = ({ comment, timeAgo, user, id, handleDelete }) => {
  return (
    <div className="form-group" key={comment._id}>
      <label>
        <span
          style={{
            fontSize: "0.8rem",
            marginLeft: "8px",
            color: "#666",
          }}
        >
          {comment.name} {comment.lastName} - {timeAgo}
        </span>
      </label>

      <textarea
        type="text"
        name="comment"
        defaultValue={comment.comment}
        rows="2"
        disabled
      />

      {user._id === comment.userId && (
        <div className="comment-btns-container">
          <Link
            to={`/dashboard/edit-comment/${comment._id}/${id}`}
            className="comment-btn"
          >
            Update
          </Link>

          <button
            onClick={() => handleDelete(comment._id)}
            className="comment-btn comment-btn-delete"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default Comment
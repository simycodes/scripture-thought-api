/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
day.extend(relativeTime);
import "./myScriptureThought.css";


const MyScriptureThought = ({thought, user, handleLike, handleDelete}) => {
  const timeAgo = day(thought.createdAt).fromNow();

  return (
    <div
      key={thought._id}
      className="thought-wrapper border rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition"
    >
      <h3 className="font-semibold">
        <i>
          {thought.description}...
          <i className="text-blue-600 text-sm">thought by you</i>..
          <i className="text-sm">
            {user.name} {user.lastName}{" "}
          </i>
          (<i className="text-blue-600 text-sm">{timeAgo}</i>)
        </i>
      </h3>

      <p className="mt-2 text-sm text-gray-600 font-medium">
        <strong>{thought.scriptureVerse}</strong>
      </p>

      <p className="mt-3 text-gray-700 leading-relaxed">{thought.thought}</p>

      <p className="mt-3 text-gray-600 text-sm">Likes: {thought.likeCount}</p>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <button
          onClick={() => handleLike(thought)}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
        >
          {thought.likes.includes(user._id) ? "Unlike" : "Like"}
        </button>

        <Link
          to={`/dashboard/comments/${thought._id}`}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm hover:bg-purple-700 transition"
        >
          Comments
        </Link>

        <button
          onClick={() => handleDelete(thought._id)}
          className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition"
        >
          Delete
        </button>

        <Link
          to={`/dashboard/edit-scripture-thought/${thought._id}`}
          className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition"
        >
          Update Scripture Thought
        </Link>
      </div>
    </div>
  );
}
export default MyScriptureThought
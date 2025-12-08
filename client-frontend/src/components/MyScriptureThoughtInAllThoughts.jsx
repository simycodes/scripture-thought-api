/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
day.extend(relativeTime);
import "./myScriptureThought.css";

const MyScriptureThoughtInAllThoughts = ({ thought, user, handleLike }) => {
  const timeAgo = day(thought.createdAt).fromNow();

  return (
    <div
      key={thought._id}
      className="thought-wrapper border rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition"
    >
      <h1 className="thought-title">
        <i>{thought.description}</i>
      </h1>

      <p className="thought-by-and-date">
        <i>
          <i className="text-blue-600">thought by..</i>
          <i>
            {thought.name} {thought.lastName}{" "}
          </i>
          (<i className="text-blue-600">{timeAgo}</i>)
        </i>
      </p>

      <div className="verse-and-scripture-thought">
        <p className="mt-2 verse">
          <strong>{thought.scriptureVerse}</strong>
        </p>

        <p className="mt-3 leading-relaxed">{thought.thought}</p>
      </div>

      <p className="mt-3 text-sm">Likes: {thought.likeCount}</p>

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
      </div>
    </div>
  );
};
export default MyScriptureThoughtInAllThoughts;

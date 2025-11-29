import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getThoughts, likeThought, unlikeThought } from "../api";

export default function AllScriptureThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const { user } = useOutletContext();
  const userId = user._id;

  const fetchThoughts = async () => {
    const { data } = await getThoughts();
    setThoughts(data);
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  const handleLike = async (thought) => {
    if (thought.likes.includes(userId)) {
      await unlikeThought(thought._id);
    } else {
      await likeThought(thought._id);
    }
    fetchThoughts();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Thoughts</h2>

      <div className="space-y-6">
        {thoughts.map((thought) => (
          <div
            key={thought._id}
            className="border rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {thought.description}
            </h3>

            <p className="mt-2 text-sm text-gray-600 font-medium">
              <strong>{thought.scriptureVerse}</strong>
            </p>

            <p className="mt-3 text-gray-700 leading-relaxed">
              {thought.thought}
            </p>

            <p className="mt-3 text-gray-600 text-sm">
              Likes: {thought.likeCount}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => handleLike(thought)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
              >
                {thought.likes.includes(userId) ? "Unlike" : "Like"}
              </button>

              <Link
                to={`/dashboard/comments/${thought._id}`}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm hover:bg-purple-700 transition"
              >
                Comments
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

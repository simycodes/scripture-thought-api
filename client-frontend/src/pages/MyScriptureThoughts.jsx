import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserThoughts, likeThought, unlikeThought, deleteThought } from "../api";

export default function MyScriptureThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const { user } = useOutletContext();
  const userId = user._id;

  const fetchThoughts = async () => {
    const { data } = await getUserThoughts();
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

  const handleDelete = async (thoughtId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this thought?"
    );
    if (!confirmDelete) return;

    try {
      await deleteThought(thoughtId);
      toast.success("Thought deleted successfully!");
      fetchThoughts();
    } catch (err) {
      console.error(
        "Error deleting thought:",
        err.response?.data || err.message
      );
      toast.error("Failed to Delete Scripture Thought, Try Again Later");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Scripture Thoughts</h2>

      <div className="space-y-6">
        {thoughts.map((thought) => (
          <div
            key={thought._id}
            className="border rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-gray-900">{thought.description}</h3>

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
                {thought.likes.includes(userId) ? "Unlike" : "Like"}
              </button>

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

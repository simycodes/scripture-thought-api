import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyScriptureThought from "../components/MyScriptureThought"
import "./myScriptureThoughts.css";
import { getUserThoughts, likeThought, unlikeThought, deleteThought } from "../api";

export default function MyScriptureThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const { user } = useOutletContext();
  const userId = user._id;
  const [isLoading, setIsLoading] = useState(true);

  const fetchThoughts = async () => {
    setIsLoading(true);

    const { data } = await getUserThoughts();
    setThoughts(data);
    setIsLoading(false);
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

    // DISPLAY LOADING NOTIFICATION WHEN THE SCRIPTURE THOUGHTS ARE BEING FETCHED FROM API
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-[10px] border-gray-300 rounded-full border-t-blue-600 animate-spin"></div>
        </div>
      );
    }

  // IF ALL USERS HAVE NOT CREATED ANY SCRIPTURE THOUGHTS DISPLAY THE NO SCRIPTURE THOUGHTS AVAILABLE
  if (thoughts.length === 0) {
    return (
      <div className="thoughts-holder">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          No scripture thoughts to display, start creating now!
        </h1>
      </div>
    );
  }

  return (
    <div className="thoughts-holder">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        My Scripture Thoughts
      </h1>

      <div className="thoughts-container">
        {thoughts.map((thought) => {
          return (
            <MyScriptureThought
              key={thought._id}
              thought={thought}
              user={user}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

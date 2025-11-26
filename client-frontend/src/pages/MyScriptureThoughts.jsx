import { useOutletContext } from "react-router-dom";
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
      // alert("Thought deleted successfully!");
      toast.success("Thought deleted successfully!");
      fetchThoughts();
    } catch (err) {
      console.error(
        "Error deleting thought:",
        err.response?.data || err.message
      );
      // alert("Failed to delete thought. Check console for details.");
      toast.error("Failed to Delete Scripture Thought, Try Again Later");
    }
  };

  return (
    <div>
      <h2>My Scripture Thoughts</h2>
      {thoughts.map((thought) => (
        <div
          key={thought._id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <h3>{thought.description}</h3>
          <p>
            <strong>{thought.scriptureVerse}</strong>
          </p>
          <p>{thought.thought}</p>
          <p>Likes: {thought.likeCount}</p>
          <button onClick={() => handleLike(thought)}>
            {thought.likes.includes(userId) ? "Unlike" : "Like"}
          </button>
          <button
            onClick={() => handleDelete(thought._id)}
            style={{
              marginLeft: "10px",
              backgroundColor: "red",
              color: "white",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

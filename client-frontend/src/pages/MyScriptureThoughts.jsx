import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyScriptureThought from "../components/MyScriptureThought"
import { getUserThoughts, likeThought, unlikeThought, deleteThought } from "../api";

export default function MyScriptureThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const { user } = useOutletContext();
  const userId = user._id;

  const fetchThoughts = async () => {
    const { data } = await getUserThoughts();
    console.log(data);
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Scripture Thoughts
      </h2>

      <div className="space-y-6">

        {
          thoughts.map((thought) => {
            return <MyScriptureThought 
                key={thought._id} 
                thought={thought} 
                user={user}
                handleLike={handleLike}
                handleDelete={handleDelete}
              />
          })
        }

       
      </div>
    </div>
  );
}

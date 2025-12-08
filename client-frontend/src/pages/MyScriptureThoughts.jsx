import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserThoughts, likeThought, unlikeThought, deleteThought } from "../api";
import ThoughtCard from "../components/ThoughtCard";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await getUserThoughts();
    return data;
  } catch (err) {
    return [];
  }
};

export default function MyScriptureThoughts() {
  const { user } = useOutletContext();
  const userId = user._id;
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const { data } = await getUserThoughts();
      setThoughts(data);
    } catch (err) {
      toast.error("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleLike = async (t) => {
    try {
      if (t.likes?.includes(userId)) await unlikeThought(t._id);
      else await likeThought(t._id);
      fetch();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this thought?")) return;
    try {
      await deleteThought(id);
      toast.success("Deleted");
      fetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (thoughts.length === 0) return <div className="text-center py-8">No thoughts yet — create one!</div>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {thoughts.map((t) => (
        <ThoughtCard key={t._id} thought={t} userId={userId} onLike={handleLike} onDelete={handleDelete} />
      ))}
    </div>
  );
}

import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { getThoughts } from "../api";
import ThoughtCard from "../components/ThoughtCard";
import { toast } from "react-toastify";

export default function AllScriptureThoughts() {
  const { user } = useOutletContext();
  const userId = user._id;
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await getThoughts();
      // API could return author ids — we rely on backend to include name fields. If not, you can fetch users separately.
      setThoughts(response.data);
    } catch (err) {
      toast.error("Failed to fetch thoughts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (thoughts.length === 0) return <div className="text-center py-8">No thoughts found.</div>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {thoughts.map((t) => (
        <ThoughtCard key={t._id} thought={t} userId={userId} onLike={() => {}} onDelete={() => {}} />
      ))}
    </div>
  );
}

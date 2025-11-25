import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditScriptureThought() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = "691d8bc2684a2bcc6c7bb9c3"; // hardcoded user for testing
  const [thoughtData, setThoughtData] = useState(null);
  const [description, setDescription] = useState("");
  const [scriptureVerse, setScriptureVerse] = useState("");
  const [thought, setThought] = useState("");

  useEffect(() => {
    const fetchThought = async () => {
      try {
        const res = await fetch(`http://localhost:5000/thoughts/get-thought/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user }), // sending user in body
        });

        const data = await res.json();

        if (data._id) {
          setThoughtData(data);
          setDescription(data.description);
          setScriptureVerse(data.scriptureVerse);
          setThought(data.thought);
        }
      } catch (err) {
        console.error("Error fetching thought:", err);
      }
    };

    fetchThought();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/thoughts/update-thought/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, description, scriptureVerse, thought }),
      });

      const data = await res.json();
      console.log("Updated Thought:", data);
      navigate("/dashboard/my-scripture-thoughts");
    } catch (err) {
      console.error("Error updating thought:", err);
    }
  };

  if (!thoughtData) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        value={scriptureVerse}
        onChange={(e) => setScriptureVerse(e.target.value)}
        placeholder="Scripture Verse"
      />
      <textarea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder="Your Thought"
      />
      <button type="submit">Update Thought</button>
    </form>
  );
}

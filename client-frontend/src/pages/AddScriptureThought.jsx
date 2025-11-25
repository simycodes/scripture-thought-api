import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { createThought } from "../api"; 
import { useNavigate } from "react-router-dom";

export default function AddScriptureThought() {
  const [description, setDescription] = useState("");
  const [scriptureVerse, setScriptureVerse] = useState("");
  const [thought, setThought] = useState("");
  const navigate = useNavigate();

  const { user } = useOutletContext();
  const userId = user._id;
  // const user = "691d8bc2684a2bcc6c7bb9c3";   // hardcoded user ID for testing

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createThought({ userId, description, scriptureVerse, thought });
      setDescription("");
      setScriptureVerse("");
      setThought("");
      alert("Thought added successfully!");
      navigate("/dashboard/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        placeholder="Scripture Verse"
        value={scriptureVerse}
        onChange={(e) => setScriptureVerse(e.target.value)}
        required
      />
      <textarea
        placeholder="Thought"
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        required
      />
      <button type="submit">Add Thought</button>
    </form>
  );
}

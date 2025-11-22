import { useEffect, useState } from "react";
import { getThoughts, likeThought, unlikeThought } from "../api";

export default function AllScriptureThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const user = "691d8bc2684a2bcc6c7bb9c3";   // hardcoded user ID for testing

  const fetchThoughts = async () => {
    const { data } = await getThoughts();
    setThoughts(data);
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  const handleLike = async (thought) => {
    if (thought.likes.includes(user)) {
      await unlikeThought(thought._id, user);
    } else {
      await likeThought(thought._id, user);
    }
    fetchThoughts();
  };

  return (
    <div>
      <h2>All Thoughts</h2>
      {thoughts.map((thought) => (
        <div key={thought._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{thought.description}</h3>
          <p><strong>{thought.scriptureVerse}</strong></p>
          <p>{thought.thought}</p>
          <p>Likes: {thought.likeCount}</p>
          <button onClick={() => handleLike(thought)}>
            {thought.likes.includes(user) ? "Unlike" : "Like"}
          </button>
        </div>
      ))}
    </div>
  );
}

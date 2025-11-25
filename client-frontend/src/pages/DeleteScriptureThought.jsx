import { useState } from "react";
import { deleteThought } from "../api";
import { useNavigate } from "react-router-dom";

const DeleteScriptureThought = ({ thoughtId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 
  const user = "691d8bc2684a2bcc6c7bb9c3"; // Hardcoded user ID for testing

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this thought?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      console.log(user);
      await deleteThought(thoughtId, user); 
      alert("Thought deleted successfully!");
      navigate("/dashboard/my-scripture-thoughts");
    } catch (err) {
      console.error("Error deleting thought:", err.response?.data || err.message);
      alert("Failed to delete thought. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "8px 16px",
        border: "none",
        cursor: "pointer",
      }}
    >
      {loading ? "Deleting..." : "Delete Thought"}
    </button>
  );
};

export default DeleteScriptureThought;

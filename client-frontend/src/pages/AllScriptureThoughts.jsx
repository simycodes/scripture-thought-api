import { useOutletContext, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyScriptureThoughtInAllThoughts from "../components/MyScriptureThoughtInAllThoughts";
import "./myScriptureThoughts.css";
import customFetch from "../utils/customFetch";
import {
  getThoughts,
  likeThought,
  unlikeThought,
} from "../api";

export default function AllScriptureThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const { user } = useOutletContext();
  const userId = user._id;

  const fetchThoughts = async () => {
    let thoughts = [];
    let users = [];
    // GET SCRIPTURE THOUGHTS
    try {
      const response = await getThoughts();
      thoughts = response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return;
    }

    // GET THE USERS (name and lastName) FOR THE COMMENTS
    try {
      const response = await customFetch.get("/users/get-users-for-comments");
      users = response.data.users; 
    } catch (error) {
      toast.error(error?.response.data.msg);
      return redirect("/dashboard/");
    }

    // LOOKUP MAP FOR THE USERS BY ID
    const userMap = {};
    users.forEach((user) => {
      userMap[user._id] = user;
    });

    // ADD name AND lastName TO EACH SCRIPTURE-THOUGHT
    const updatedThoughts = thoughts.map((thought) => {
      const user = userMap[thought.user];

      return {
        ...thought,
        name: user?.name || "Unknown",
        lastName: user?.lastName || "",
      };
    });

    console.log(updatedThoughts);
    setThoughts(updatedThoughts);
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

  return (
    <div className="thoughts-holder">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Thoughts</h2>

      <div className="thoughts-container">
        {thoughts.map((thought) => {
          return (
            <MyScriptureThoughtInAllThoughts
              key={thought._id}
              thought={thought}
              user={user}
              handleLike={handleLike}
            />
          );
        })}
      </div>
    </div>
  );
}

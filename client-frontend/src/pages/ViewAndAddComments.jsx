import {
  Form,
  useOutletContext,
  useLoaderData,
  redirect,
  useNavigation,
  useParams,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
day.extend(relativeTime);
import customFetch from "../utils/customFetch";
import Comment from "../components/Comment";
import { motion } from "framer-motion";

// ================= LOADER =====================
export const loader = async ({ params }) => {
  let scriptureThought = null;
  let comments = [];
  let userDetails = null;

  try {
    const response = await customFetch.get(
      `/scripture-thoughts/get-thought/${params.id}`
    );
    scriptureThought = response.data.scriptureThought;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/my-scripture-thoughts");
  }

  try {
    const response = await customFetch.get(
      `/users/get-user-for-single-scripture-thought/${scriptureThought.user}`
    );
    userDetails = response.data.userDetails;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/my-scripture-thoughts");
  }

  try {
    const response = await customFetch.get(`/comments/${params.id}`);
    comments = response.data.comments;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/my-scripture-thoughts");
  }

  return { scriptureThought, comments, userDetails };
};

// =============== ACTION (ADD COMMENT) =================
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const thoughtId = params.id;
  data.thoughtId = thoughtId;

  try {
    await customFetch.post("/comments/", data);
    toast.success("Your comment has been created successfully");
    return redirect(`/dashboard/comments/${params.id}`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// ================= COMPONENT =========================
const ViewAndAddComments = () => {
  const { user } = useOutletContext();
  const { name, lastName } = user;
  const { scriptureThought, comments, userDetails } = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { description, scriptureVerse, thought } = scriptureThought;

  // DELETE COMMENT FUNCTION
  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      await customFetch.delete(`/comments/${commentId}`);
      toast.success("Comment deleted successfully");
      return navigate(`/dashboard/comments/${id}`);
    } catch (err) {
      toast.error("Failed to delete comment. Try again.");
      return navigate(`/dashboard/comments/${id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8 px-4">
      
      {/* HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Discussion on Scripture Thought
        </h2>

        <p className="text-gray-600 mb-4">
          By:{" "}
          <span className="text-blue-600 font-semibold">
            {userDetails.name} {userDetails.lastName}
          </span>
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-gray-500 font-medium">Description</p>
            <p className="border p-2 rounded bg-gray-50">{description}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Scripture Verse</p>
            <p className="border p-2 rounded bg-gray-50">{scriptureVerse}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Thought</p>
            <p className="border p-2 rounded bg-gray-50 whitespace-pre-line">
              {thought}
            </p>
          </div>
        </div>
      </motion.div>

      {/* COMMENT FORM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Add Your Comment
        </h3>

        <Form method="post" className="space-y-4">
          <input type="hidden" name="name" defaultValue={name} />
          <input type="hidden" name="lastName" defaultValue={lastName} />

          <textarea
            name="comment"
            placeholder="Share your thoughts..."
            rows="3"
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow transition"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </Form>
      </motion.div>

      {/* COMMENTS SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Comments</h3>

        {comments.length === 0 ? (
          <p className="text-gray-600 italic">No comments yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => {
              const timeAgo = day(comment.createdAt).fromNow();
              return (
                <Comment
                  key={comment._id}
                  comment={comment}
                  timeAgo={timeAgo}
                  user={user}
                  id={id}
                  handleDelete={handleDelete}
                />
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ViewAndAddComments;

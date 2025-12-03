import { Form, useOutletContext, useLoaderData, redirect, useNavigation, useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import "./viewAndAddComments.css";

// LOADER FUNCTION TO FETCH THE SCRIPTURE THOUGHT TO BE UPDATED
export const loader = async ({ params }) => {
  let scriptureThought = null;
  let comments = [];

  console.log(params.id);
  
  try {
    const response = await customFetch.get(`/scripture-thoughts/get-thought/${params.id}`);
    scriptureThought = response.data.scriptureThought;
    console.log(scriptureThought);
  } catch (error) {
    toast.error(error?.response.data.msg);
    // return redirect("/dashboard/my-scripture-thoughts");
  }

  // GET COMMENTS
   try {
    const response = await customFetch.get(`/comments/${params.id}`);
    comments = response.data.comments;
    console.log(comments);
   } catch (error) {
     toast.error(error?.response.data.msg);
     return redirect("/dashboard/my-scripture-thoughts");
   }

   return { scriptureThought, comments };
};

// ACTION FUNCTION TO HANDLE UPDATE SCRIPTURE THOUGHT SUBMISSION TO THE API
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

const ViewAndAddComments = () => {
  const { user } = useOutletContext();
  const { name, lastName } = user;
  const { scriptureThought, comments } = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();

  const { description, scriptureVerse, thought } = scriptureThought;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // FUNCTION TO DELETE A SINGLE COMMENT
  const handleDelete = async (commentId) => {
    console.log("Delete function reached!");
    console.log(id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      await customFetch.delete(`comments/${commentId}`);
      toast.success("Comment deleted successfully!");
      return navigate(`/dashboard/comments/${id}`);
    } catch (err) {
      toast.error("Failed to Comment, Try Again Later");
      return navigate(`/dashboard/comments/${id}`);
    }
  };

  // DISPLAY LOADING NOTIFICATION WHEN THE SCRIPTURE THOUGHT AND ITS COMMENTS ARE BEING FETCHED FROM API

  return (
    <div className="comments-container fade-in">
      <div className="profile-card slide-up">
        <h2 className="profile-title">
          View and Add Comments to this Scripture Thought
        </h2>

        <div className="profile-form">
          <div className="form-group">
            <label>Description/Title</label>
            <input
              type="text"
              name="description"
              defaultValue={description}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Scripture Verse</label>
            <input
              type="text"
              name="scriptureVerse"
              defaultValue={scriptureVerse}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Scripture Thought</label>
            <textarea
              type="text"
              name="thought"
              defaultValue={thought}
              rows="3"
              disabled
            />
          </div>

          <Form method="post" className="profile-form" key={comments.length}>
            <input type="hidden" name="name" defaultValue={name} required />
            <input
              type="hidden"
              name="lastName"
              defaultValue={lastName}
              required
            />

            <div className="form-group">
              <label>Add Comment</label>
              <textarea
                type="text"
                name="comment"
                placeholder="Write your comment here"
                rows="3"
              />
            </div>

            <div className="submit-row">
              <button
                type="submit"
                className="btn-save"
                disabled={isSubmitting}
              >
                {isSubmitting ? "submitting..." : "Add Comment"}
              </button>
            </div>
          </Form>
        </div>
      </div>

      {/* CARD NUMBER TWO DISPLAYING COMMENTS BY VARIOUS USERS */}
      <div className="profile-card slide-up">
        <h2 className="profile-title">Comments</h2>

        <div className="profile-form">
          {comments.length === 0 ? (
            <p>
              There are no comments for this scripture thought, be the first to
              comment
            </p>
          ) : (
            comments.map((comment) => {
              const date = new Date(comment.createdAt).toLocaleString();

              return (
                <div className="form-group" key={comment._id}>
                  <label>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        marginLeft: "8px",
                        color: "#666",
                      }}
                    >
                      {comment.name} {comment.lastName} - {date}
                    </span>
                  </label>

                  <textarea
                    type="text"
                    name="comment"
                    defaultValue={comment.comment}
                    rows="2"
                    disabled
                  />

                  {user._id === comment.userId && (
                    <div className="comment-btns-container">
                      <Link
                        to={`/dashboard/edit-comment/${comment._id}/${id}`}
                        className="comment-btn"
                      >
                        Update
                      </Link>

                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="comment-btn comment-btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAndAddComments;
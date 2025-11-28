import {
  Form,
  useLoaderData,
  redirect,
  useNavigation,
  useParams,
  Link
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import "./editComment.css";

// LOADER FUNCTION TO FETCH THE COMMENT TO BE UPDATED
export const loader = async ({ params }) => {
  console.log("edit comment loader reached!")
  console.log(params.id);
  console.log(params.thoughtId);
  try {
    const { data } = await customFetch.get(`/comments/get-single-comment/${params.id}`);
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response.data.msg);
    return redirect(`/dashboard/comments/${params.thoughtId}`);
  }
};

// ACTION FUNCTION TO HANDLE UPDATE COMMENT SUBMISSION TO THE API
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/comments/${params.id}`, data);
    toast.success("Your comment has been updated successfully");
    return redirect(`/dashboard/comments/${params.thoughtId}`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect(`/dashboard/comments/${params.thoughtId}`);
  }
};

const EditComment = () => {
  const { comment } = useLoaderData();
  const { thoughtId } = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const date = new Date(comment.createdAt).toLocaleString();

  return (
    <div className="comments-container fade-in">
      <div className="profile-card slide-up">
        <h2>Update Your Comment</h2>

        <div className="profile-form">
          <Form method="post" className="profile-form">
            <div className="form-group">
              <label>
                <span>
                  {comment.name} {comment.lastName} - commented on {date}
                </span>
              </label>

              <textarea
                type="text"
                name="comment"
                defaultValue={comment.comment}
                rows="4"
              />

              <div className="comment-btns-container">
                <Link
                  to={`/dashboard/comments/${thoughtId}`}
                  className="btn-save"
                >
                  {isSubmitting ? "submitting..." : "Cancel"}
                </Link>

                <div className="submit-row">
                  <button
                    type="submit"
                    className="btn-save"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "submitting..." : "Update Comment"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditComment;

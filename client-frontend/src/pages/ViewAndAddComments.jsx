import { Form, useLoaderData, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import "./ViewAndAddComments.css";

// LOADER FUNCTION TO FETCH THE SCRIPTURE THOUGHT TO BE UPDATED
export const loader = async ({ params }) => {
  console.log("loader reached!");
  let scriptureThought = null;
  let comments = [];
  
  try {
    const response = await customFetch.get(`/scripture-thoughts/get-thought/${params.id}`);
    scriptureThought = response.data.scriptureThought;

    // const { data } = await customFetch.get(`/scripture-thoughts/get-thought/${params.id}`);
    // console.log(data);
    // return data;
  } catch (error) {
    toast.error(error?.response.data.msg);
    return redirect("/dashboard/my-scripture-thoughts");
  }

  // GET COMMENTS
   try {
    const response = await customFetch.get(`/comments/${params.id}`);
    comments = response.data.comments;
     // const { comments } = await customFetch.get(`/comments/${params.id}`);
     // console.log(comments);
     // return data;
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
  console.log(data);

  try {
    await customFetch.post("/comments/", data);
    toast.success("Your comment has been updated successfully");
    return redirect("/dashboard/my-scripture-thoughts");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ViewAndAddComments = () => {
  const { scriptureThought, comments} = useLoaderData();
  console.log(scriptureThought);
  console.log(comments);

  const { description, scriptureVerse, thought } = scriptureThought;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  console.log(description);
  console.log(scriptureVerse);


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

          <Form method="post" className="profile-form">
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

      {/* CARD NUMBER TWO */}
      <div className="profile-card slide-up">
        <h2 className="profile-title">Comments</h2>

        <div className="profile-form">
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            comments.map((c) => {
              const date = new Date(c.createdAt).toLocaleString(); // format timestamp

              return (
                <div className="form-group" key={c._id}>
                  <label>
                    Comment
                    <span
                      style={{
                        fontSize: "0.8rem",
                        marginLeft: "8px",
                        color: "#666",
                      }}
                    >
                      ({date})
                    </span>
                  </label>

                  <textarea
                    type="text"
                    name="comment"
                    defaultValue={c.comment}
                    rows="3"
                    disabled
                  />
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
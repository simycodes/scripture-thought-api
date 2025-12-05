import { Form, useLoaderData, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import "./editScriptureThought.css";

// LOADER FUNCTION TO FETCH THE SCRIPTURE THOUGHT TO BE UPDATED
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/scripture-thoughts/get-thought/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response.data.msg);
    return redirect("/dashboard/my-scripture-thoughts");
  }
};

// ACTION FUNCTION TO HANDLE UPDATE SCRIPTURE THOUGHT SUBMISSION TO THE API
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/scripture-thoughts/update-thought/${params.id}`, data);
    toast.success("Your Scripture Thought has been updated successfully");
    return redirect("/dashboard/my-scripture-thoughts");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export default function EditScriptureThought() {
  const { scriptureThought } = useLoaderData();
  console.log(scriptureThought);
  const { description, scriptureVerse, thought } = scriptureThought;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="profile-container fade-in">
      <div className="profile-card slide-up">
        <h2 className="profile-title">Update your Scripture Thought</h2>

        {/* SCRIPTURE THOUGHT DETAILS */}
        <Form method="post" className="profile-form">
          <div className="form-group">
            <label>Description/Title</label>
            <input
              type="text"
              name="description"
              defaultValue={description}
              required
            />
          </div>

          <div className="form-group">
            <label>Scripture Verse</label>
            <input
              type="text"
              name="scriptureVerse"
              defaultValue={scriptureVerse}
            />
          </div>

          <div className="form-group">
            <label>Your Scripture Thought</label>
            <textarea
              type="text"
              name="thought"
              defaultValue={thought}
              rows="5"
              required
            />
          </div>

          <div className="submit-row">
            <button type="submit" className="btn-save" disabled={isSubmitting}>
              {isSubmitting ? "submitting..." : "Update Scripture Thought"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

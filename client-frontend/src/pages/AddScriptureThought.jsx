// import { useState } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify"; 
import customFetch from "../utils/customFetch";
import "./addScriptureThought.css";

// ACTION FUNCTION TO HANDLE CREATE SCRIPTURE DATA SUBMISSION TO THE API
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); 

  try {
    await customFetch.post("/scripture-thoughts/create-thought", data);
    toast.success("Your Scripture Thought has been created successful");
    return redirect("/dashboard/my-scripture-thoughts");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  
};

export default function AddScriptureThought() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="profile-container fade-in">
      <div className="profile-card slide-up">
        <h2 className="profile-title">Create a Scripture Thought</h2>

        {/* SCRIPTURE THOUGHT DETAILS TO BE ENTERED */}
        <Form method="post" className="profile-form">
          <div className="form-group">
            <label htmlFor="description">Description/Title</label>
            <input
              id="description"
              type="text"
              name="description"
              placeholder="Example: God loves us all!"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="verse" className="label-text">Scripture Verse</label>
            <input
              id="verse"
              type="text"
              name="scriptureVerse"
              placeholder="Example: John 3:16"
            />
          </div>

          <div className="form-group">
            <label htmlFor="your-scripture">Your Scripture Thought</label>
            <textarea
              id="your-scripture"
              type="text"
              name="thought"
              placeholder="Your Scripture Thought goes here..."
              rows="5"
              required
            />
          </div>

          <div className="submit-row">
            <button type="submit" className="btn-save" disabled={isSubmitting}>
              {isSubmitting ? "submitting..." : "Submit Scripture Thought"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

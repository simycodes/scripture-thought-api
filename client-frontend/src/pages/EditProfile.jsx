import { useOutletContext, useNavigation, Form, redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import "./profile.css";

// ACTION FUNCTION TO HANDLE PROFILE UPDATE DATA SUBMISSION TO THE API
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  try {
    await customFetch.patch("/users/update-user", data);
    toast.success("Profile updated successfully");
    return redirect("../profile");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("../profile");
  }
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="profile-container fade-in">
      <div className="profile-card slide-up">
        <h2 className="profile-title">Update Profile Information</h2>

        <Form method="post" className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" defaultValue={name} required />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue={lastName}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" defaultValue={email} required />
          </div>

          {/* CANCEL AND SUBMIT BUTTONS */}
          <div className="comment-btns-container">
            <div className="submit-row">
              <button
                className="cancel-btn"
              >
                <Link to={"/dashboard/profile"}>
                  Cancel
                </Link>
              </button>
            </div>

            <div className="submit-row">
              <button
                type="submit"
                className="btn-save"
                disabled={isSubmitting}
              >
                {isSubmitting ? "submitting..." : "Update Information"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;

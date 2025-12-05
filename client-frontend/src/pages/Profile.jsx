import { useOutletContext, Form, Link } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email } = user;

  return (
    <div className="profile-container fade-in">
      <div className="profile-card slide-up">
        <h2 className="profile-title">My Profile Information</h2>

        {/* USER PROFILE DETAILS */}
        <Form method="post" className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" defaultValue={name} disabled />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue={lastName}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" defaultValue={email} disabled />
          </div>

          <div className="submit-row">
            <Link to="../edit-profile" type="submit" className="btn-save">
              Update Profile
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;

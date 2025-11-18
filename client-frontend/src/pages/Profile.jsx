import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName } = user;

  return (
    <div>
      <h1>User Profile Name: {name} {lastName}</h1>
    </div>
  );
};

export default Profile;

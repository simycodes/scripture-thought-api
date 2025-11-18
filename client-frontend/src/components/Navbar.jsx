import { useDashboardContext } from "../pages/DashboardLayout";
// import "./Navbar.css";

const Navbar = () => {
  const { user, logoutUser } = useDashboardContext();

  return (
    <div className="navbar">
      <h1 className="navbar-title">Scripture Thoughts</h1>

      <h2 className="navbar-user">
        Hello {user?.name} {user?.lastName}
      </h2>

      <div>
        <button onClick={logoutUser} className="logout-btn">
          Logout
        </button>
      </div>

    </div>
  );
};
export default Navbar;

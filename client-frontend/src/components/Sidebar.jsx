import { NavLink } from "react-router-dom";
// import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Logo</h1>

      <div className="nav-links">
        <NavLink to={"."} className="" end>
          Add Scripture Thought
        </NavLink>

        <NavLink to={"my-scripture-thoughts"} className="" end>
          My Scripture Thoughts
        </NavLink>

        <NavLink to={"all-scripture-thoughts"} className="" end>
          All Scripture Thoughts
        </NavLink>

        <NavLink to={"profile"} className="" end>
          My Profile
        </NavLink>
      </div>
    </div>
  );
};
export default Sidebar;

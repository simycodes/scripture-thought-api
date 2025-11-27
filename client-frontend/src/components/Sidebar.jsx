import { NavLink } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { GiNothingToSay } from "react-icons/gi";
import { TfiThought } from "react-icons/tfi";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Logo</h1>

      <div className="nav-links">
        <NavLink to={"."} className="" end>
          <IoIosAddCircle className="icon" />
          Add Scripture Thought
        </NavLink>

        <NavLink to={"my-scripture-thoughts"} className="" end>
          <TfiThought className="icon" />
          My Scripture Thoughts
        </NavLink>

        <NavLink to={"all-scripture-thoughts"} className="" end>
          <GiNothingToSay className="icon" />
          All Scripture Thoughts
        </NavLink>

        <NavLink to={"profile"} className="" end>
          <IoIosPerson className="icon" />
          My Profile
        </NavLink>
      </div>
    </div>
  );
};
export default Sidebar;

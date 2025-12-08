import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { GiNothingToSay } from "react-icons/gi";
import { TfiThought } from "react-icons/tfi";
import logo from "../assets/images/logo.jpg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/dashboard/my-scripture-thoughts"}>
        <img src={logo} alt="scripture-thought-logo" className="logo" />
      </Link>

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

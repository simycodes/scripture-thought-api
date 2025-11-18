import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Landing Page</h1>

      <Link to="/register" className="btn">
        Register
      </Link>

      <Link to="/login" className="btn">
        Login
      </Link>
    </div>
  );
  
};
export default Landing;



import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h1>Register Page</h1>

      <Link to="/login" className="btn">
        Login
      </Link>

      <Link to="/" className="btn">
        Landing/Home page
      </Link>
    </div>
  );
};
export default Register;

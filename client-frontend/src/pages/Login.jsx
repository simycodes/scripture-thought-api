import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>

      <Link to="/register" className="btn">
        Register
      </Link>

      <Link to="/" className="btn">
        Landing/Home page
      </Link>
    </div>
  );
};
export default Login;

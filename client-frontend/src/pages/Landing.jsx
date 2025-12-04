import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Welcome to ScriptureThoughts
        </h1>
        <p className="text-gray-600 text-lg text-center max-w-xl mb-8">
          Share your thoughts on scripture, read insights from others, and build
          a community of spiritual discussion.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

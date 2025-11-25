import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: call your API
    console.log("Register data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring"
              placeholder="John Doe"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            Register
          </button>
        </form>

        {/* LINK TO LOGIN */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-600 font-semibold ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

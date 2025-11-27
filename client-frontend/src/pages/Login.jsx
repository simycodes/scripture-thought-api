import { Link, Form, redirect, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

// ACTION FUNCTION TO HANDLE LOGIN DATA SUBMISSION TO THE API
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <Form method="post" className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="block text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring"
              placeholder="you@example.com"
              defaultValue={"mulenga@gmail.com"}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              defaultValue={"pass1234"}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </Form>

        {/* LINK TO REGISTER */}
        <p className="text-center text-gray-600 mt-4">
          <p>Do not have an account?</p>
          <Link to="/register" className="text-blue-600 font-semibold ml-1">
            Register
          </Link>
          <Link to="/" className="text-blue-600 font-semibold ml-1">
            | Return to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

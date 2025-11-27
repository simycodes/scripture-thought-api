import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

// ACTION FUNCTION TO HANDLE REGISTER DATA SUBMISSION TO THE API
export const action = async ({ request }) => {
  const formData = await request.formData(); // request.formData() is a vanilla JS function that is used with form
  const data = Object.fromEntries(formData); // change form data into object values for easier use of data when sending to the API

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>

        <Form method="post" className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="lastName"
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
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </Form>

        {/* LINK TO LOGIN */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-600 font-semibold ml-1">
            Login
          </Link>
          <Link to="/login" className="text-blue-600 font-semibold ml-1">
            | Return to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

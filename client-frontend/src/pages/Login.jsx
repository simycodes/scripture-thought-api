import { Link, Form, redirect, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// ACTION: LOGIN USER
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
    <div className="relative min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
          Login
        </h2>

        <Form method="post" className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-white/80 block mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none"
              defaultValue={"mulenga@gmail.com"}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-white/80 block mb-1">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none"
              defaultValue={"pass1234"}
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xl transition-all"
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </Form>

        {/* LINKS */}
        <p className="text-center text-white/80 mt-5 text-sm">
          Don't have an account?
          <Link to="/register" className="text-blue-300 font-semibold ml-1 hover:underline">
            Register
          </Link>
        </p>

        <p className="text-center text-white/80 mt-2 text-sm">
          <Link to="/" className="text-blue-300 font-semibold hover:underline">
            Return to Home
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

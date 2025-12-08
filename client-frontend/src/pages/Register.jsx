import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// ACTION: REGISTER USER
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

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
    <div className="relative min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
          Create an Account
        </h2>

        <Form method="post" className="space-y-5">

          {/* FIRST NAME */}
          <div>
            <label className="text-white/80 block mb-1">First Name</label>
            <input
              id="first-name"
              type="text"
              name="name"
              placeholder="John"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="text-white/80 block mb-1">Last Name</label>
            <input
              id="last-name"
              type="text"
              name="lastName"
              placeholder="Doe"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-white/80 block mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none"
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
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xl transition-all"
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </Form>

        {/* LINKS */}
        <p className="text-center text-white/80 mt-5 text-sm">
          Already have an account?
          <Link to="/login" className="text-blue-300 font-semibold ml-1 hover:underline">
            Login
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

export default Register;

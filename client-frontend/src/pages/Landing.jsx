import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const quotes = [
  "“Trust in the Lord with all thine heart.” — Proverbs 3:5",
  "“I can do all things through Christ which strengtheneth me.” — Philippians 4:13",
  "“Be still, and know that I am God.” — Psalm 46:10",
];

const Landing = () => {
  const [index, setIndex] = useState(0);

  // Rotate scripture quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Parallax Image */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 text-white text-center">
        
        {/* Title Fade-in */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          ScriptureThoughts
        </motion.h1>

        {/* Description Fade-in */}
        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Share your reflections, learn from others, and be inspired through
          scripture-focused conversations that strengthen faith and uplift souls.
        </motion.p>

        {/* Scripture Rotator */}
        <motion.div
          key={index}
          className="text-lg md:text-xl italic font-light mb-12 max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {quotes[index]}
        </motion.div>

        {/* Buttons with stagger animation */}
        <motion.div
          className="flex gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.4, staggerChildren: 0.15 } },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <Link
              to="/login"
              className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl transition-all duration-200"
            >
              Login
            </Link>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <Link
              to="/register"
              className="px-7 py-3 bg-white/80 hover:bg-white text-gray-900 rounded-xl shadow-xl transition-all duration-200"
            >
              Register
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-1 h-2 bg-white rounded-full mt-2" />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Landing;

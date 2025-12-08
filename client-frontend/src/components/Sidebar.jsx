import { NavLink } from "react-router-dom";
import { FiHome, FiPlusSquare, FiFileText, FiUsers } from "react-icons/fi";

const navItems = [
  { to: "/dashboard", label: "Add Thought", icon: <FiPlusSquare /> },
  { to: "/dashboard/my-scripture-thoughts", label: "My Thoughts", icon: <FiFileText /> },
  { to: "/dashboard/all-scripture-thoughts", label: "All Thoughts", icon: <FiUsers /> },
  { to: "/dashboard/profile", label: "Profile", icon: <FiHome /> },
];

export default function Sidebar() {
  return (
    <aside className="w-72 hidden md:block bg-white border-r min-h-screen">
      <div className="p-6">
        <h3 className="font-bold text-xl mb-4">ScriptureThoughts</h3>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

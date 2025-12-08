import { Link } from "react-router-dom";
import { useDashboard } from "../pages/DashboardLayout"
import { FiBell, FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { user, logoutUser } = useDashboard();

  return (
    <header className="flex items-center justify-between bg-white/60 backdrop-blur-md border-b px-6 py-3">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 rounded-md"> {/* toggle sidebar on mobile if you'd implement */} ☰</button>
        <Link to="/dashboard" className="text-lg font-semibold">
          ScriptureThoughts
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100"><FiBell /></button>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-700 mr-2">
            <div className="font-medium">{user?.name} {user?.lastName}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/dashboard/profile" className="p-2 rounded-md hover:bg-gray-100"><FiUser /></Link>
            <button onClick={logoutUser} className="p-2 rounded-md hover:bg-gray-100" title="Logout"><FiLogOut /></button>
          </div>
        </div>
      </div>
    </header>
  );
}

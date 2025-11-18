import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import { createContext, useContext } from "react";
import "./DashboardLayout.css";


// This is a DashboardLayout global context, will help pass global variables to <Sidebar /> components
const DashBoardContext = createContext();

const DashboardLayout = () => {
  const navigate = useNavigate();
  const user = { name: "Simon", lastName: "Mule" }

  const logoutUser = async () => {
    navigate("/");
  };

  return (
    <DashBoardContext.Provider value={{ user, logoutUser }}>
      {/* user, logoutUser as global variables will be passed to <Sidebar /> and <Navbar /> and all their children components */}
      <main className="dashboard-layout">
        {/* SmallSidebar displays on small screen and BigSidebar on large screens */}
        <Sidebar />

        <div className="dashboard-main">
          <Navbar />
          <div>
            <Outlet context={{ user }} className="dashboard-content" />
            {/* AddScriptureThought,MyScriptureThoughts, Profile Pages etc will be displayed here */}
            {/* A context prop exits on the Outlet hook, when provided with data, all 
            the sub pages/components of defined in the Outlet gain access to this data 
            (making it global data). */}
          </div>
        </div>

      </main>
    </DashBoardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashBoardContext);
export default DashboardLayout;

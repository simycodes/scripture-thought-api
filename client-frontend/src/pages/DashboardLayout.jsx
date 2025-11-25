import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import { createContext, useContext, useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import "./DashboardLayout.css";


// This is a DashboardLayout global context, will help pass global variables to <Sidebar /> components
const DashBoardContext = createContext();

// This function is initialized to the loader property in the app router and is run before
// this page/component is loaded/open. Fetches data before it's even loaded
export const loader = async() => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user } = useLoaderData(); // get/destructure the user data from the above loader function
  const [isAuthError, setIsAuthError] = useState(false);
  // const user = { name: "Simon", lastName: "Mule" };

  // FUNCTION TO LOGOUT USER
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logout Successful");
  };

  // Using interceptors to logout users in case of an authentication error while
  // inside app - case of test user when cookie values are deleted
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);


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

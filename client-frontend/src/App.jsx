import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddScriptureThought,
  EditScriptureThought,
  MyScriptureThoughts,
  AllScriptureThoughts,
  Profile,
} from "./pages";

// Page Actions and Loaders
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";

import { loader as DashboardLoader } from "./pages/DashboardLayout";


// WEB APP ROUTING
let router = createBrowserRouter([
  {
    path: "/", // this is the parent route for all other routes
    element: <HomeLayout />, // parent component to hold features of all component pages/app
    errorElement: <Error />, // User tries accessing a page that does not exist, show this error page
    children: [
      {
        index: true,
        element: <Landing />, // will be displayed as home page with parent
        action: loginAction,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: DashboardLoader,
        children: [
          {
            index: true,
            element: <AddScriptureThought />,
          },
          {
            path: "my-scripture-thoughts",
            element: <MyScriptureThoughts />,
          },
          {
            path: "all-scripture-thoughts",
            element: <AllScriptureThoughts />,
          },
          {
            path: "edit-scripture-thought/:id",
            element: <EditScriptureThought />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "delete-scripture-thought/:id",
          },
          {
            path: "add-comment/:id",
          },
          {
            path: "edit-comment/:id",
          },
          {
            path: "delete-comment/:id",
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

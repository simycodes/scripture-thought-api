import { Outlet } from "react-router-dom";
const HomeLayout = () => {
  return (
    <>
      <Outlet />
      {/* Outlet component enables/lets the HomeLayout component to render/show the children components defined in the router in App.js file*/}
    </>
  );
}
export default HomeLayout
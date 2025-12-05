import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if(error.status === 404) {
    return (
        <div>
          {/* ERROR MESSAGE TO DISPLAY TO USERS WHEN A 404 ERROR OCCURS */}
          <h3>Ohh! page not found</h3>
          <p>We can not seem to find the page you are looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
    );
  }

  return (
    <div>
      {/* ERROR MESSAGE TO DISPLAY TO USERS WHEN OTHER ERROR OCCURS */}
      <h3>Something Went Wrong...</h3>
    </div>
  );
}

export default Error
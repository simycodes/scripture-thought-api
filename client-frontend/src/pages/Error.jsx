import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error?.statusText || error?.message || "Unexpected error."}</p>
        <Link to="/dashboard" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Back to Dashboard</Link>
      </div>
    </div>
  );
}

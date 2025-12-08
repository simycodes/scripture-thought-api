import { Form, useNavigation, redirect, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "./index";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await updateProfile(data);
    toast.success("Profile updated");
    return redirect("/dashboard/profile");
  } catch (err) {
    toast.error(err?.response?.data?.msg || "Update failed");
    return null;
  }
};

export default function Profile() {
  const { user } = useOutletContext();
  const nav = useNavigation();
  const submitting = nav.state === "submitting";

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <Form method="post" className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First name</label>
          <input name="name" defaultValue={user.name} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last name</label>
          <input name="lastName" defaultValue={user.lastName} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="email" defaultValue={user.email} className="mt-1 w-full border rounded px-3 py-2" />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={submitting}>
            {submitting ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </Form>
    </div>
  );
}

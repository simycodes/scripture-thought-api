import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { createThought } from "./index";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await createThought(data);
    toast.success("Scripture thought created");
    return redirect("/dashboard/my-scripture-thoughts");
  } catch (err) {
    toast.error(err?.response?.data?.msg || "Failed to create");
    return null;
  }
};

export default function AddScriptureThought() {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create a Scripture Thought</h2>
      <Form method="post" className="space-y-4 bg-white rounded-lg p-6 shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input name="description" required className="mt-1 w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Scripture Verse</label>
          <input name="scriptureVerse" className="mt-1 w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Thought</label>
          <textarea name="thought" rows="5" required className="mt-1 w-full border rounded px-3 py-2"></textarea>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded">
            {submitting ? "Submitting..." : "Submit Thought"}
          </button>
        </div>
      </Form>
    </div>
  );
}

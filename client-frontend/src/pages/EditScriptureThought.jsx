import { Form, useLoaderData, useNavigation, redirect } from "react-router-dom";
import { getThought, updateThought } from "./index";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  try {
    const { data } = await getThought(params.id);
    return data;
  } catch (err) {
    toast.error("Failed to load thought");
    return redirect("/dashboard/my-scripture-thoughts");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await updateThought(params.id, data);
    toast.success("Updated successfully");
    return redirect("/dashboard/my-scripture-thoughts");
  } catch (err) {
    toast.error(err?.response?.data?.msg || "Update failed");
    return null;
  }
};

export default function EditScriptureThought() {
  const { scriptureThought } = useLoaderData();
  const nav = useNavigation();
  const isSubmitting = nav.state === "submitting";

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Scripture Thought</h2>

      <Form method="post" className="bg-white rounded-lg p-6 shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input name="description" defaultValue={scriptureThought.description} required className="mt-1 w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Scripture Verse</label>
          <input name="scriptureVerse" defaultValue={scriptureThought.scriptureVerse} className="mt-1 w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Thought</label>
          <textarea name="thought" defaultValue={scriptureThought.thought} rows="5" required className="mt-1 w-full border rounded px-3 py-2"></textarea>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Thought"}
          </button>
        </div>
      </Form>
    </div>
  );
}

import { Form, useLoaderData, useNavigation, redirect } from "react-router-dom";
import { getSingleComment, updateComment } from "./index";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  try {
    const { data } = await getSingleComment(params.id);
    return data;
  } catch (err) {
    toast.error("Failed to load comment");
    return redirect("/dashboard");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await updateComment(params.id, data);
    toast.success("Updated");
    return redirect(`/dashboard/comments/${params.thoughtId}`);
  } catch (err) {
    toast.error("Update failed");
    return null;
  }
};

export default function EditComment() {
  const { comment } = useLoaderData();
  const nav = useNavigation();
  const submitting = nav.state === "submitting";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Edit Comment</h3>
        <Form method="post">
          <textarea name="comment" defaultValue={comment.comment} rows="4" className="w-full border rounded px-3 py-2" />
          <div className="mt-3 flex justify-end gap-2">
            <button className="px-4 py-2 rounded border" type="button" onClick={() => window.history.back()}>Cancel</button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white" disabled={submitting}>{submitting ? "Saving..." : "Save"}</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

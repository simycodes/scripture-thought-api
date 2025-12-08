export default function DeleteConfirm({ onConfirm, loading, label = "Delete" }) {
  return (
    <button
      onClick={onConfirm}
      disabled={loading}
      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
    >
      {loading ? "Deleting..." : label}
    </button>
  );
}

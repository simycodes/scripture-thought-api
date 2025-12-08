import { Link } from "react-router-dom";
import { FiThumbsUp, FiEdit, FiTrash2 } from "react-icons/fi";

export default function ThoughtCard({ thought, userId, onLike, onDelete }) {
  const liked = thought.likes?.includes(userId);

  return (
    <article className="bg-white rounded-xl shadow p-4 border">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold">{thought.description}</h3>
          <p className="text-sm text-gray-600">{thought.scriptureVerse}</p>
          <p className="mt-3 text-gray-700">{thought.thought}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button onClick={() => onLike(thought)} className={`px-3 py-1 rounded ${liked ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
            <FiThumbsUp className="inline mr-1" /> {thought.likes?.length || 0}
          </button>

          <div className="flex gap-2">
            <Link to={`/dashboard/edit-scripture-thought/${thought._id}`} className="p-2 rounded hover:bg-gray-100"><FiEdit /></Link>
            <button onClick={() => onDelete?.(thought._id)} className="p-2 rounded hover:bg-red-50 text-red-600"><FiTrash2 /></button>
          </div>

          <Link to={`/dashboard/comments/${thought._id}`} className="mt-2 text-sm text-blue-600 hover:underline">View comments</Link>
        </div>
      </div>
    </article>
  );
}

import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
day.extend(relativeTime);

export default function CommentCard({ comment, currentUserId, onEdit, onDelete }) {
  const timeAgo = day(comment.createdAt).fromNow();

  return (
    <div className="border-b py-3 flex justify-between gap-3">
      <div>
        <div className="text-sm text-gray-700 font-medium">{comment.name} {comment.lastName} <span className="text-xs text-gray-400 ml-2">{timeAgo}</span></div>
        <p className="text-gray-800 mt-1">{comment.comment}</p>
      </div>

      <div className="flex gap-2 items-start">
        {comment.user_id === currentUserId && (
          <>
            <button onClick={() => onEdit(comment)} className="text-sm text-blue-600 hover:underline">Edit</button>
            <button onClick={() => onDelete(comment._id)} className="text-sm text-red-600 hover:underline">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

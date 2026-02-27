import TagChip from "./TagChip";
import StarRating from "./StarRating";

function TodoItem({
  todo,
  key,
  handleEdit,
  handleDelete,
  selectedIds,
  toggleSelect,
  handleStatusChange,
  handleToggleFavorite,
  handleRatingChange,
  handleRemoveTag,
  tagArray,
}) {
  const statusColor =
    todo.status === "completed"
      ? "bg-green-100 text-green-700"
      : todo.status === "on-hold"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-blue-100 text-blue-700";

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">

        <input
          type="checkbox"
          className="w-5 h-5 rounded-md"
          checked={selectedIds.includes(todo.id)}
          onChange={() => toggleSelect(todo.id)}
        />
        
        <span className="text-lg ml-5 text-2xl font-medium text-black">
          {todo.title}
        </span>
        <p className="ml-5 text-lg text-2xl font-medium text-gray-500">
          {(() => {
            const desc = todo.description.trim();
            return desc.length > 5 ? desc.slice(0, 5) + "..." : desc;
          })()}
        </p>
        {todo.Tags?.map((tag) => (
          <TagChip
            key={tag.id}
            tag={tag}
            onRemove={(tagId) => handleRemoveTag(todo.id, tag.id)}
          />

        )
        )}
        
        <StarRating 
          rating={todo.rating || 0} 
          onRatingChange={(rating) => handleRatingChange(todo.id, rating)}
          size="text-lg"
        />
      </div>
      <div className="flex items-center gap-3">
        <select
          className={`px-3 py-1 rounded-md text-sm ${statusColor}`}
          value={todo.status}
          onChange={(e) => handleStatusChange(todo.id, e.target.value)}
        >
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
        </select>

        <button onClick={() => handleEdit(todo)} className="">
          ✏️
        </button>
        <button onClick={() => handleDelete(todo)} className="">
          🗑️
        </button>
        <button
          onClick={() => handleToggleFavorite(todo.id, !todo.is_favorite)}
          className=""
        >
          {todo.is_favorite ? "⭐" : "☆"}
        </button>
      </div>

    </div>
  );
}

export default TodoItem;

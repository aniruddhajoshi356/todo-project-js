

const TagChip = ({ tag, onRemove }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full mr-2 mb-2">
      
      {/* Tag Name */}
      <span>{tag.tagname}</span>

      {/* Cancel Button */}
      <button type="button"
        onClick={() => onRemove(tag.id)}
        className="ml-2 text-blue-500 hover:text-red-500 transition-colors bg-transparent duration-200"
      >
        ✕
      </button>
    </span>
  )
}

export default TagChip;
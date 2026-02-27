const TagChip = ({ tag, onRemove }) => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 rounded-full">
      <span>{tag.tagname}</span>
      <button
        type="button"
        onClick={() => onRemove(tag.id)}
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-red-500/20 hover:text-red-400 text-indigo-400 transition-colors border-0 bg-transparent p-0 leading-none"
      >
        <i className="fa-solid fa-xmark text-[9px]"></i>
      </button>
    </span>
  );
};

export default TagChip;
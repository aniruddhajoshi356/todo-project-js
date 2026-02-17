function TodoItem({ todo, key, handleEdit, handleDelete, selectedIds, toggleSelect, handleStatusChange}) {
    const statusColor =
        todo.status === "completed"
        ? "bg-green-100 text-green-700"
        : todo.status === "on-hold"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-blue-100 text-blue-700";
    // const onEditClick = () => {
    //     const newTitle = prompt("Edit your task:", todo.title);

    //     if (newTitle && newTitle.trim() !== "") {
    //     handleEdit(todo.id, newTitle.trim());
    //     }
    // };
    return (
        <div className="flex items-center justify-between border-b py-4">
        
            <div className="flex items-center gap-4">
                <input 
                type="checkbox" 
                className="w-5 h-5 rounded-md" 
                checked={selectedIds.includes(todo.id)}
                onChange={() => toggleSelect(todo.id)} />
                <span className="text-lg ml-5 text-2xl font-medium text-black">{todo.title}</span>
            </div>

            <div className="flex items-center gap-3">
                
                <select
                className={`px-3 py-1 rounded-md text-sm ${statusColor}`}
                value={todo.status}
                onChange={(e) =>
                    handleStatusChange(todo.id, e.target.value)
                }
                >
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                </select>

                <button
                    onClick={() => handleEdit(todo)}
                    className=""
                >✏️</button>
                <button
                    onClick={() => handleDelete(todo)}
                    className=""
                >🗑️</button>
            </div>
                {/* {console.log(todo)} */}
        </div>
    );
}

export default TodoItem;

import TodoItem from "./TodoItem";

function TodoList({
    todos,
    handleEdit,
    handleDelete,
    toggleSelect,
    selectedIds,
    handleStatusChange
}) {
    return (
        <div className="h-100 w-180 overflow-y-auto scroll-right">
            {todos.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">
                    No todos found
                </p>
            ) : (
                todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        toggleSelect={toggleSelect}
                        selectedIds={selectedIds}
                        handleStatusChange={handleStatusChange}
                    />
                ))
            )}
        </div>
    );
}

export default TodoList;

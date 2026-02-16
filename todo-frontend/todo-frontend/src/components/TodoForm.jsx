import { useState } from "react";

function TodoForm({ handleAddTodo }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTodo(title, description);
        setTitle("");
        setDescription("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 mb-6"
        >
            <input
                type="text"
                placeholder="Enter your task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 text-black border-black border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 text-black border-black  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="bg-black text-white w-12 h-12 rounded-lg text-2xl flex items-center justify-center hover:bg-gray-800"
            >
                +
            </button>
        </form>
    );
}

export default TodoForm;

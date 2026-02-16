
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import FilterBar from "./FilterBar";
import {
    fetchTodos,
    createTodoAPI,
    updateStatusAPI,
    deleteTodoAPI,
} from "../services/api";


import { useEffect, useState } from "react";
const DEFAULT_STATE=[
    {
        id:1,
        title:"Learn React",
        description:"Learn React",
        status:"on-hold"
    },
    {
        id:2,
        title:"Learn Node",
        description:"Learn Node",
        status:"in_progress"
    },
    {
        id:3,
        title:"Learn Python",
        description:"Learn Python",
        status:"in_progress"
    }
]

const TodoContainer = () => {
    //const [todos, setTodos] = useState(DEFAULT_STATE);
    const [todos, setTodos] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const loadTodos = async () => {
            const data = await fetchTodos();
            setTodos(data);
        };

        loadTodos();
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 400); // 400ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);



    const filteredTodos = todos
        .filter((todo) => {
            if (filter === "ALL") return true;
            return todo.status === filter;
        })
        .filter((todo) => {
            if (!debouncedSearch.trim()) return true;

            const search = debouncedSearch.toLowerCase();

            return (
                todo.title.toLowerCase().includes(search) ||
                todo.description?.toLowerCase().includes(search)
            );
        });


    const handleAddTodo = async (title, description) => {
        const newTodo = await createTodoAPI(title, description);
        setTodos((prev) => [...prev, newTodo]);
    };

    const handleEdit = (id, newTitle) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, title: newTitle } : todo
            ));
    };

    
    const handleStatusChange = async (id, newStatus) => {
    await updateStatusAPI(id, newStatus);

    setTodos((prev) =>
        prev.map((todo) =>
            todo.id === id ? { ...todo, status: newStatus } : todo
        )
        );
    };

    const handleDelete = async (todo_delete) => {
    const isConfirmed = window.confirm(
        `Are you sure you want to delete "${todo_delete.title}" ?`
    );

    if (isConfirmed) {
        await deleteTodoAPI(todo_delete.id);
        setTodos((prev) => prev.filter((todo) => todo.id !== todo_delete.id));
    }
    };

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
            ? prev.filter((item) => item !== id)
            : [...prev, id]
        );
    };
    const handleSelectAll = () => {
        if (selectedIds.length === filteredTodos.length) {
            setSelectedIds([]);
        } else {
            const visibleIds = filteredTodos.map((todo) => todo.id);
            setSelectedIds(visibleIds);
        }
    }; 





return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-3xl p-8 max-h-[80vh] overflow-y-auto">

        {/* Header */}
        <div className="text-center mb-8">
            <h1 className="text-3xl text-black font-style italic font-bold flex justify-center items-center gap-2">
                📝 Planora
            </h1>
            <p className="text-xl mt-4 text-black">
                What do you want to do today?
            </p>
        </div>
        <TodoForm handleAddTodo={handleAddTodo}/>
        
        <FilterBar
            filter={filter}
            setFilter={setFilter}
            selectedIds={selectedIds}
            todos={filteredTodos}
            handleSelectAll={handleSelectAll}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />



        <TodoList
            todos={filteredTodos}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            toggleSelect={toggleSelect}
            selectedIds={selectedIds}
            handleSelectAll={handleSelectAll}
            handleStatusChange={handleStatusChange}
        />

        

    </div>

)
}

export default TodoContainer;



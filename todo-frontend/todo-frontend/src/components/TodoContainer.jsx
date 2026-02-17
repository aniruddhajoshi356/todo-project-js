
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import FilterBar from "./FilterBar";
import Modal from "./Modal";
import Pagination from "./Pagination";
import {
    fetchTodos,
    createTodoAPI,
    updateStatusAPI,
    deleteTodoAPI,
    updateTodoAPI,
} from "../services/api";


import { useCallback, useEffect, useState } from "react";
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

            const loadTodos = useCallback(async () => {
            const data = await fetchTodos(currentPage, debouncedSearch, filter);
            setTodos(data.todos);
            setTotalPages(data.totalPages);
            if (currentPage > data.totalPages ){
                setCurrentPage(data.totalPages);
            }
            if(currentPage==0 && data.totalPages > 0){
                setCurrentPage(1);
            }
        }, [currentPage, debouncedSearch, filter])

    useEffect(() => {
        loadTodos();
    }, [currentPage, debouncedSearch, filter]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 400); // 400ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);


    const handleAddTodo = async (title, description) => {
        const newTodo = await createTodoAPI(title, description);
        loadTodos()
    };

    // const handleEdit = (id, newTitle) => {
    //     setTodos((prev) =>
    //         prev.map((todo) =>
    //             todo.id === id ? { ...todo, title: newTitle } : todo
    //         ));
    // };

    
    const handleStatusChange = async (id, newStatus) => {
        await updateStatusAPI(id, newStatus);
        await loadTodos();
    };


    const openDeleteModal = (todo) => {
        setTodoToDelete(todo);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!todoToDelete) return;

        await deleteTodoAPI(todoToDelete.id);

        setTodos((prev) =>
            prev.filter((todo) => todo.id !== todoToDelete.id)
        );

        setIsModalOpen(false);
        setTodoToDelete(null);
    };
    
    const openEditModal = (todo) => {
        setTodoToEdit(todo);
        setEditTitle(todo.title);
        setIsEditOpen(true);
    };
    const confirmEdit = async () => {
        if (!editTitle.trim()) return;
        await updateTodoAPI(todoToEdit.id, editTitle);
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === todoToEdit.id
                    ? { ...todo, title: editTitle }
                    : todo
            )
        );

        setIsEditOpen(false);
        setTodoToEdit(null);
        setEditTitle("");
    };
    const closeEditModal = () => {
        setIsEditOpen(false);
        setTodoToEdit(null);
        setEditTitle("");
    };

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
            ? prev.filter((item) => item !== id)
            : [...prev, id]
        );
    };
    const handleSelectAll = () => {
        if (selectedIds.length === todos.length) {
            setSelectedIds([]);
        } else {
            const visibleIds = todos.map((todo) => todo.id);
            setSelectedIds(visibleIds);
        }
    }; 





return (
    <div className="w-200 h-200 bg-white shadow-lg rounded-3xl p-8 max-h-[80vh]">

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
            todos={todos}
            handleSelectAll={handleSelectAll}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />



        <TodoList
            todos={todos}
            handleEdit={openEditModal}
            handleDelete={openDeleteModal}
            toggleSelect={toggleSelect}
            selectedIds={selectedIds}
            handleSelectAll={handleSelectAll}
            handleStatusChange={handleStatusChange}
        />

        <Modal
            isOpen={isModalOpen}
            title="Confirm Delete"
            message={`Are you sure you want to delete "${todoToDelete?.title}"?`}
            onConfirm={confirmDelete}
            onCancel={() => setIsModalOpen(false)}
        />
        <Modal
            isOpen={isEditOpen}
            title="Edit Todo Title"
            onConfirm={confirmEdit}
            onCancel={closeEditModal}
        >
            <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full text-black border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </Modal>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />
    </div>

)
}

export default TodoContainer;



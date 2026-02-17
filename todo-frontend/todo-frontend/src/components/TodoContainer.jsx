import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import FilterBar from "./FilterBar";
import Modal from "./Modal";
import Pagination from "./Pagination";
import Toast from "./Toast";
import {
  fetchTodos,
  createTodoAPI,
  updateStatusAPI,
  deleteTodoAPI,
  updateTodoAPI,
  bulkDeleteAPI,
} from "../services/api";

import { useCallback, useEffect, useState } from "react";
const DEFAULT_STATE = [
  {
    id: 1,
    title: "Learn React",
    description: "Learn React",
    status: "on-hold",
  },
  {
    id: 2,
    title: "Learn Node",
    description: "Learn Node",
    status: "in_progress",
  },
  {
    id: 3,
    title: "Learn Python",
    description: "Learn Python",
    status: "in_progress",
  },
];

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
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "",
  });
  const loadTodos = useCallback(async () => {
    const data = await fetchTodos(currentPage, debouncedSearch, filter);
    setTodos(data.todos);
    setTotalPages(data.totalPages);
    if (currentPage > data.totalPages) {
      setCurrentPage(data.totalPages);
    }
    if (currentPage == 0 && data.totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, debouncedSearch, filter]);

  useEffect(() => {
    loadTodos();
  }, [currentPage, debouncedSearch, filter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400); // 400ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 3000);
  };

  const handleAddTodo = async (title, description) => {
    await createTodoAPI(title, description);
    setCurrentPage(1);
    showToast("Todo created successfully", "success");
    await loadTodos();
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateStatusAPI(id, newStatus);
    showToast(`Todo status updated successfully as ${newStatus}`, "success");
    await loadTodos();
  };

  const openDeleteModal = (todo) => {
    setTodoToDelete(todo);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!todoToDelete) return;

    await deleteTodoAPI(todoToDelete.id);
    showToast("Todo deleted successfully", "success");

    await loadTodos();

    setIsModalOpen(false);
    setTodoToDelete(null);
  };
  const openBulkDeleteModal = () => {
    if (selectedIds.length === 0) return;
    setIsBulkModalOpen(true);
  };
  const confirmBulkDelete = async () => {
    await bulkDeleteAPI(selectedIds);
    showToast("Todos deleted successfully", "success");
    await loadTodos();

    setSelectedIds([]);
    setIsBulkModalOpen(false);
  };

  const openEditModal = (todo) => {
    setTodoToEdit(todo);
    setEditTitle(todo.title);
    setIsEditOpen(true);
  };
  const confirmEdit = async () => {
    if (!editTitle.trim()) return;
    await updateTodoAPI(todoToEdit.id, editTitle);
    showToast(`Todo updated successfully as ${editTitle}`, "success");
    await loadTodos();

    setIsEditOpen(false);
    setTodoToEdit(null);
    setEditTitle("");
  };
  const closeEditModal = async () => {
    setIsEditOpen(false);
    setTodoToEdit(null);
    setEditTitle("");
    await loadTodos();
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
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
          <img src="/download.png" alt="Planora" className="w-10 h-10" /> Planora
        </h1>
        <p className="text-xl mt-4 text-black">What do you want to do today?</p>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />

      <TodoForm handleAddTodo={handleAddTodo} setToast={setToast} />

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
      <div className="flex justify-between">
        {/* <button
          onClick={openBulkDeleteModal}
          className="rounded-lg text-white bg-red-500 hover:bg-red-600"
          disabled={selectedIds.length === 0}
        >
          Delete All
        </button> */}
        <button
          onClick={openBulkDeleteModal}
          disabled={selectedIds.length === 0}
          className={`px-4 py-2 rounded-lg font-medium text-white shadow-md transition-all duration-200 ${
            selectedIds.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 hover:shadow-lg active:scale-95"
          }`}
        >
          Delete Selected
        </button>

        <Modal
          isOpen={isBulkModalOpen}
          title="Delete Selected Todos"
          onConfirm={confirmBulkDelete}
          onCancel={() => {
            setSelectedIds([]);
            setIsBulkModalOpen(false);
          }}
        >
          <p className="text-black">
            Are you sure you want to delete{" "}
            <strong>{selectedIds.length}</strong> selected{" "}
            {selectedIds.length == 1 ? "todo" : "todos"}?
          </p>
        </Modal>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          setSelectedIds={setSelectedIds}
        />
      </div>
    </div>
  );
};

export default TodoContainer;

import { useState, useEffect, useCallback } from "react";
import { createCategoryAPI, getCategoriesAPI } from "../services/api";
import Modal from "./Modal";

function TodoForm({ handleAddTodo, setToast, setTagArray }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [tags, setTags] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const categories = await getCategoriesAPI();
      setCategoriesList(categories);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  }, []);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreateCategory = async (e) => {
    try {
      e.preventDefault();
      const newCategory = await createCategoryAPI(newCategoryName);

      setNewCategoryName("");
      setToast({ message: "Category created successfully", type: "success" });
      setCategoriesList((prev) => [...prev, newCategory]);
      setSelectedCategoryId(newCategory.id);
      setIsNewCategoryModalOpen(false);
    } catch (err) {

      console.error("Failed to create category", err);
      setToast({ message: "Failed to create category", type: "error" });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || title.trim() === "") {
      setToast({ message: "Please enter a task title", type: "error" });
      return;
    }
    if (!description || description.trim() === "") {
      setToast({ message: "Please enter a task description", type: "error" });
      return;
    }
    if (!selectedCategoryId) {
      setToast({ message: "Please select a category", type: "error" });
      return;
    }
    if (!tags || tags.trim() === "") {
      setToast({ message: "Please enter tags", type: "error" });
      return;
    }
    const tagArr = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    if (tagArr.length > 2) {
      setToast({ message: "Maximum 2 tags allowed", type: "error" });
      return;
    }
    setTagArray(tagArr);

    handleAddTodo(title, description, selectedCategoryId, tagArr);
    setTitle("");
    setDescription("");
    setNewCategoryName("");
    setSelectedCategoryId("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="w-24 font-bold text-gray-600">Task Title</label>
        <input
          type="text"
          placeholder="Enter your task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>
      <div className="flex items-center gap-4">
        <label className="w-24 font-bold text-gray-600">Category</label>
        <select
          value={selectedCategoryId}
          onChange={(e) => {
            if (e.target.value === "other") {
              setIsNewCategoryModalOpen(true);
            } else {
              setSelectedCategoryId(e.target.value);
            }
          }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        >
          <option value="" disabled>
            {categoriesList.length === 0
              ? "No categories available"
              : "Select Category"}
          </option>

          {categoriesList.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
          <option value="other">+ Create New Category</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <label className="w-24 font-bold text-gray-600">Description</label>
        <input
          type="text"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 text-black border-black  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex items-center gap-4">
        <label className="w-24 font-bold text-gray-600">Tags</label>
        <input
          type="text"
          placeholder="Enter tags separated by comma (max 2)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="flex-1 text-black border-black  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <button
          type="submit"
          className="bg-black text-white rounded-lg flex items-center font-bold px-4 py-2 h-10 w-242 justify-center hover:bg-gray-800"
        >
          ADD
        </button>
      </div>
      <Modal
        isOpen={isNewCategoryModalOpen}
        title="Create New Category"
        onConfirm={handleCreateCategory}
        onCancel={() => setIsNewCategoryModalOpen(false)}
      >
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="w-full text-black border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </Modal>
    </form>
  );
}

export default TodoForm;

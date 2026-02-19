const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, todoController.createTodo);
router.post("/category", authMiddleware, todoController.createCategory);
router.get("/", authMiddleware, todoController.getAllTodos);
router.get("/category", authMiddleware, todoController.getCategories);
router.get("/favorite", authMiddleware, todoController.getFavoriteTodos);
router.get("/:id", authMiddleware, todoController.getTodoById);
router.patch("/:id/status", authMiddleware, todoController.updateTodoStatus);
router.put("/:id/favorite", authMiddleware, todoController.updateTodoFavorite);
router.patch("/:id", authMiddleware, todoController.updateTodo);
router.delete("/bulk", authMiddleware, todoController.bulkDeleteTodos);
router.delete("/:id", authMiddleware, todoController.deleteTodo);



module.exports = router;

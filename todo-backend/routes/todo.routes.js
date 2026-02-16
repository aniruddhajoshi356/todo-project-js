const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo.controller");

router.post("/", todoController.createTodo);
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.patch("/:id/status", todoController.updateTodoStatus);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;

const Todo = require("../models/todo.model");

const ALLOWED_STATUS = ["in_progress", "on-hold", "completed"];

/**
 * Create Todo
 */
exports.createTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        // Title validation
        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        // Description validation
        if (!description || !description.trim()) {
            return res.status(400).json({
                success: false,
                message: "Description is required",
            });
        }

        // Status validation (optional but controlled)
        if (status && !ALLOWED_STATUS.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value",
            });
        }

        const newTodo = await Todo.create({
            title: title,
            description: description,
            status: status || "in_progress",
        });

        return res.status(201).json({
            success: true,
            data: newTodo,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};



/**
 * Get All Todos
 */
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll();

        return res.status(200).json({
        success: true,
        count: todos.length,
        data: todos,
        });

    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
        });
    }
};


/**
 * Get Todo by ID
 */
exports.getTodoById = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByPk(id);

        if (!todo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found",
        });
        }

        return res.status(200).json({
        success: true,
        data: todo,
        });

    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
        });
    }
};


/**
 * Update Todo Status
 */
exports.updateTodoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status value",
        });
        }

        const todo = await Todo.findByPk(id);

        if (!todo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found",
        });
        }

        todo.status = status;
        await todo.save();

        return res.status(200).json({
        success: true,
        message: "Status updated successfully",
        data: todo,
        });

    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
        });
    }
    };


    /**
     * Delete Todo
     */
    exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByPk(id);

        if (!todo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found",
        });
        }

        await todo.destroy();

        return res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
        });
    }
};

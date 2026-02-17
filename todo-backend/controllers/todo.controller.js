const Todo = require("../models/todo.model");
const {Op} = require("sequelize");

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
        //const todos = await Todo.findAll();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        const filter = req.query.filter || "ALL";

        const offset = (page - 1) * limit;

        const filters  = {}
        if (filter !== "ALL") {
            filters.status = filter;
        }
        if (search) {
            filters.title = {
                [Op.iLike]: `%${search}%`
            };
        }

        const { count, rows } = await Todo.findAndCountAll({
            where  :filters,
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
        return res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            todos: rows,
        });

    } catch (error) {
        console.error(error)
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
 * Update Todo Title
 */
exports.updateTodo = async (req, res) => {
    try{
        const { id } = req.params;
        const { title } = req.body;

        const todo = await Todo.findByPk(id);

        if (!todo) return res.status(404).json({ message: "Not found" });

        todo.title = title;
        await todo.save();

        res.json({ success: true, data: todo });
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

/**
 * Bulk Delete Todos
 */
exports.bulkDeleteTodos = async (req, res) => {
    console.log("Request Body: ", req.body)
    try {
        const { ids } = req.body;
        console.log("ids", ids);
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No IDs provided",
            });
        }
        console.log(ids);

        await Todo.destroy({
        where: {
            id: {
                [Op.in]: ids
            }
        }
        });

        return res.status(200).json({
            success: true,
            message: "Selected todos deleted successfully",
        });

    } catch (error) {
        console.error("Bulk delete error:", error);
        return res.status(500).json({
            success: false,
            message: "Bulk delete failed",
            error: error.message,
        });
    }
};


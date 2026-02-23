const { Todo, Category, Tag } = require("../models");
const { Op } = require("sequelize");

const ALLOWED_STATUS = ["in_progress", "on-hold", "completed"];

/**
 * Create Todo
 */
const { sequelize } = require("../models");
exports.createTodo = async (req, res) => {
  try {
    const { title, description, status, categoryId, tags } = req.body;

    // 🔹 Basic Validation
    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    if (status && !ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    let normalizedTags = [];

    if (Array.isArray(tags)) {
      normalizedTags = [
        ...new Set(
          tags
            .map(tag => tag?.trim().toLowerCase())
            .filter(tag => tag)
        )
      ];

      if (normalizedTags.length > 2) {
        return res.status(400).json({
          success: false,
          message: "Maximum 2 tags allowed per todo",
        });
      }
    }
    const newTodo = await Todo.create({
      title: title.trim(),
      description: description.trim(),
      status: status || "in_progress",
      categoryId,
      userId: req.user.id,
    });

    if (normalizedTags.length > 0) {
      const tagInstances = [];

      for (const tagName of normalizedTags) {
        const [tag] = await Tag.findOrCreate({
          where: { tagname: tagName },
        });

        tagInstances.push(tag);
      }

      await newTodo.addTags(tagInstances);
    }

    const todoWithTags = await Todo.findByPk(newTodo.id, {
      include: {
        model: Tag,
        through: { attributes: [] },
      },
    });

    return res.status(201).json({
      success: true,
      data: todoWithTags,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
/**
 * Create Category
 */
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    const existing = await Category.findOne({
      where: {
        name,
        userId: req.user.id,
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = await Category.create({
      name: name,
      userId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      data: newCategory,
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

    const filters = { userId: req.user.id };
    if (filter !== "ALL") {
      filters.status = filter;
    }
    if (search) {
      filters.title = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const { count, rows } = await Todo.findAndCountAll({
      where: filters,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      todos: rows,
    });
  } catch (error) {
    console.error(error);
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

    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
          through: { attributes: [] },
        },
      ],
    });

    if (!todo) {
      //console.log("Todo not found");
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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
/**
 * Get Categories
 */
exports.getCategories = async (req, res) => {
  try {
    console.log("Getting categories for user:", req.user.id);
    const categories = await Category.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
/**
 * Get Favorite Todos
 */
exports.getFavoriteTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        userId: req.user.id,
        is_favorite: true,
      },
    });
    return res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
/**
 * Update Todo Favorite
 */
exports.updateTodoFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_favorite } = req.body;

    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    todo.is_favorite = is_favorite;
    await todo.save();

    return res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error(error);
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

    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

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
    console.error(error);
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
  try {
    const { id } = req.params;
    const { title } = req.body;

    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!todo) return res.status(404).json({ message: "Not found" });

    todo.title = title;
    await todo.save();

    res.json({ success: true, data: todo });
  } catch (error) {
    console.error(error);
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

    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
/**
 * remove tag from todo
 */
exports.removeTagFromTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag_id } = req.body;

    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    const tag = await Tag.findByPk(tag_id);

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }

    await todo.removeTag(tag);

    return res.status(200).json({
      success: true,
      message: "Tag removed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * Update Todo Rating
 */
exports.updateTodoRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        // Rating validation
        if (typeof rating !== 'number' || rating < 0 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be a number between 0 and 5",
            });
        }

        // Check if rating is in 0.5 increments
        if ((rating * 2) % 1 !== 0) {
            return res.status(400).json({
                success: false,
                message: "Rating must be in 0.5 increments (0, 0.5, 1, 1.5, etc.)",
            });
        }

        const todo = await Todo.findByPk(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        todo.rating = rating;
        await todo.save();

        return res.status(200).json({
            success: true,
            message: "Rating updated successfully",
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
 * Bulk Delete Todos
 */
exports.bulkDeleteTodos = async (req, res) => {
  //console.log("Request Body: ", req.body)
  try {
    const { ids } = req.body;
    //console.log("ids", ids);
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No IDs provided",
      });
    }
    //console.log(ids);

    await Todo.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
        userId: req.user.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Selected todos deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Bulk delete failed",
      error: error.message,
    });
  }
};

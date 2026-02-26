const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Todo = sequelize.define(
    "Todo",
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },

        title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
            msg: "Title cannot be empty",
            },
        },
        },

        description: {
        type: DataTypes.TEXT,
        allowNull: true,
        },

        status: {
        type: DataTypes.ENUM(
            "in_progress",
            "on-hold",
            "completed"
        ),
        allowNull: false,
        defaultValue: "in_progress",
        },

        rating: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            min: {
                args: [0.0],
                msg: "Rating cannot be less than 0",
            },
            max: {
                args: [5.0],
                msg: "Rating cannot be more than 5",
            },
        },
        },
        userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: { tableName: "users", schema: "js_todo" },
            key: "id"
        },
        },
        categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: { tableName: "categories", schema: "js_todo" },
            key: "id"
        },
        },
        is_favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        },
    },
    {
        tableName: "todos",
        timestamps: true, // adds createdAt & updatedAt
    }
);

module.exports = Todo;

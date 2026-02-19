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
        userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        },
        },
        categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "categories",
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

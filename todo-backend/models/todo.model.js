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
    },
    {
        tableName: "todos",
        timestamps: true, // adds createdAt & updatedAt
    }
);

module.exports = Todo;

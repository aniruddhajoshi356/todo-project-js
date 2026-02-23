const sequelize = require("../config/db");
const TodoTag = sequelize.define(
  "TodoTag",
  {},
  {
    tableName: "todo_tags",
    timestamps: false,
  },
);

module.exports = TodoTag;

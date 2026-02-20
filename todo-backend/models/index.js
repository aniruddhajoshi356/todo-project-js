const sequelize = require("../config/db");
const User = require("./user.model");
const Todo = require("./todo.model");
const Category = require("./category.model"); 
const Tag = require("./tag.model");
const TodoTag = require("./todoTag.model");

// User ↔ Todo
User.hasMany(Todo, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});
Todo.belongsTo(User, {
  foreignKey: "userId"
});

// User ↔ Category
User.hasMany(Category, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});
Category.belongsTo(User, {
  foreignKey: "userId"
});

// Category ↔ Todo
Category.hasMany(Todo, {
  foreignKey: "categoryId",
  onDelete: "CASCADE"
});
Todo.belongsTo(Category, {
  foreignKey: "categoryId"
});

// Todo ↔ Tag (Many to Many)
Todo.belongsToMany(Tag, {
  through: TodoTag,
  foreignKey: "todo_id",
  otherKey: "tag_id",
});

Tag.belongsToMany(Todo, {
  through: TodoTag,
  foreignKey: "tag_id",
  otherKey: "todo_id",
});

module.exports = {
  sequelize,
  User,
  Todo,
  Category,
  Tag,
  TodoTag
};
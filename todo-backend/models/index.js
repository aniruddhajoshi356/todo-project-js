const sequelize = require("../config/db");
const User = require("./user.model");
const Todo = require("./todo.model");
const Category = require("./category.model"); 

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

module.exports = {
  sequelize,
  User,
  Todo,
  Category
};

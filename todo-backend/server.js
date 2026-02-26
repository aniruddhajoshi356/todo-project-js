require("dotenv").config();

const app = require("./app");
const { sequelize, User, Category, Tag, Todo, TodoTag } = require("./models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.createSchema("js_todo", { ifNotExists: true });

    // Sync in dependency order — parents before children
    await User.sync({ alter: true });
    await Category.sync({ alter: true });
    await Tag.sync({ alter: true });
    await Todo.sync({ alter: true });    // depends on User + Category
    await TodoTag.sync({ alter: true }); // depends on Todo + Tag
    console.log("Tables synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Unable to connect to DB:", err);
    process.exit(1);
  }
};

startServer();

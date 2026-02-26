require("dotenv").config();

const app = require("./app");
const {sequelize} = require("./models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.createSchema("js_todo", { ifNotExists: true });
    await sequelize.sync({ alter: true });
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

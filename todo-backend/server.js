require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db");
const Todo = require("./models/todo.model");

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
    .then(async () => {
        console.log("Database connected ✅");

        await sequelize.sync({ alter: true });
        console.log("Tables synced 🔄");

        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} 🚀`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to DB:", err);
    });

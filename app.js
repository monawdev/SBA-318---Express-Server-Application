import express from "express";

import logger from "./middleware/logger.js";
import requestCounter from "./middleware/requestCounter.js";

import recipeRoutes from "./routes/recipes.js";
import userRoutes from "./routes/users.js";
import ingredientRoutes from "./routes/ingredients.js";

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(logger);
app.use(requestCounter);

// view engine
app.set("view engine", "ejs");

// pages
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/recipe-view", (req, res) => {
  res.render("recipe");
});

app.get("/about", (req, res) => {
  res.render("about");
});

// API routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ingredients", ingredientRoutes);

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
import express from "express";

const router = express.Router();

// temporary in-memory data
let recipes = [
  { id: 1, name: "Pizza", difficulty: "easy" },
  { id: 2, name: "Burger", difficulty: "medium" },
  { id: 3, name: "Pasta", difficulty: "easy" }
];

// GET ALL 

router.get("/", (req, res) => {
  let result = recipes;

  // filter by difficulty
  if (req.query.difficulty) {
    result = result.filter(
      r => r.difficulty.toLowerCase() === req.query.difficulty.toLowerCase()
    );
  }

  // filter by name
  if (req.query.name) {
    result = result.filter(
      r => r.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }

  res.json(result);
});

// GET ONE 

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  res.json(recipe);
});



// POST 

router.post("/", (req, res) => {
  const newRecipe = {
    id: recipes.length + 1,
    name: req.body.name,
    difficulty: req.body.difficulty
  };

  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});


// PATCH 

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  recipe.name = req.body.name || recipe.name;
  recipe.difficulty = req.body.difficulty || recipe.difficulty;

  res.json(recipe);
});



// DELETE

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = recipes.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  recipes.splice(index, 1);

  res.sendStatus(204);
});

export default router;
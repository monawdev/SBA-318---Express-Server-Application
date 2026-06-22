import express from "express";
import ingredients from "../data/ingredients.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(ingredients);
});

router.post("/", (req, res) => {
  const item = {
    id: ingredients.length + 1,
    name: req.body.name
  };

  ingredients.push(item);
  res.status(201).json(item);
});

export default router;
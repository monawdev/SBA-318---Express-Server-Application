import express from "express";
import validator from "validator";

const router = express.Router();

let users = [
  { id: 1, name: "Ali", email: "ali@test.com" },
  { id: 2, name: "Sara", email: "sara@test.com" }
];

// GET ALL 

router.get("/", (req, res) => {
  let result = users;

  if (req.query.name) {
    result = result.filter(u =>
      u.name.toLowerCase().includes(req.query.name.toLowerCase())
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

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});


// POST

router.post("/", (req, res) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PATCH

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.json(user);
});


// DELETE

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(index, 1);
  res.sendStatus(204);
});

export default router;
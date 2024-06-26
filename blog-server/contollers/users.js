const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");

const userFinder = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);
    const user = await User.create({ username, name, passwordHash });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:id", userFinder, async (req, res, next) => {
  try {
    req.user;
    req.user.username = req.body.username;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", userFinder, (req, res) => {
  User.findByPk(req.params.id).then((user) => {
    user.destroy();
  });
});

module.exports = router;

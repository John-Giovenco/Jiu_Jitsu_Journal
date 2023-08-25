const router = require("express").Router();
const db = require("../models");

const { Move, description, User } = db;

router.post("/", async (req, res) => {
  if (!req.body.name) {
    req.body.name = "name";
  }
  if (!req.body.style) {
    req.body.style = "gi";
  }
  if (!req.body.position) {
    req.body.position = "position";
  }
  const move = await Move.create(req.body);
  res.json(place);
});

router.get("/moveId", async (req, res) => {
  let moveId = Number(req.params.moveId);
  if (isNaN(moveId)) {
    res.status(404).json({ message: `Invalid id "${placeId}"` });
  } else {
    const move = await Move.findONe({
      where: { moveId: moveId },
      include: {
        assocition: "description",
      },
    });
    if (!move) {
      res
        .status(404)
        .json({ message: `Could not find move with id "${moveId}` });
    } else {
      res.json(move);
    }
  }
});

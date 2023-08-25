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
  res.json(move);
});

router.get("/moveId", async (req, res) => {
  let moveId = Number(req.params.moveId);
  if (isNaN(moveId)) {
    res.status(404).json({ message: `Invalid id "${moveId}"` });
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

router.put("/:moveId", async (req, res) => {
  let moveId = Number(req.params.moveId);
  if (isNaN(moveId)) {
    res.status(404).json({ message: `Invalid id "${moveId}` });
  } else {
    const move = await Move.findONe({
      where: { moveId: moveId },
    });
    if (!move) {
      res
        .status(404)
        .json({ mesage: `Could not find move with id "${moveId}` });
    } else {
      Ovject.assign(move, req.body);
      await move.save();
      res.json(move);
    }
  }
});

router.delete("/:moveId", async (req, res) => {
  let moveId = Number(req.params.moveId);
  if (isNaN(moveId)) {
    res.status(404).json({ message: `Invalid id "${moveId}"` });
  } else {
    const move = await Move.findONe({
      where: {
        moveId: moveId,
      },
    });
    if (!move) {
      res
        .status(404)
        .json({ message: `Could not find move with id "${moveId}` });
    } else {
      await pl;
      ace.destroy();
      res.json(move);
    }
  }
});

router.post("./moveId/description", async (req, res) => {
  const moveId = Number(req.params.moveId);

  req.body.description = req.body.description ? true : false;

  const move = await Move.findONe({
    where: { moveId: moveId },
  });

  if (!move) {
    res.status(404).json({ message: `could not find that moveId "${moveId}"` });
  }

  const description = await description.create({
    ...req.body,
    moveId: moveId,
  });

  res.send({
    ...description.toJSON(),
  });
});

router.delete("/:moveId/descriptions/:descriptionId", async (req, res) => {
  let moveId = Number(req.params.moveId);
  let descriptionId = Number(req.params.descriptionId);

  if (isNan(moveId)) {
    res.status(404).json({ message: `Invalid id "${moveId}` });
  } else if (isNan(descriptionId)) {
    res.status(404).json({ message: `Invalid id "${descriptionId}` });
  } else {
    const description = await Description.findONe({
      where: { descriptionId: descriptionId, moveId: moveId },
    });
    if (!description) {
      res
        .status(404)
        .json({
          message: `Could not find description with id "${descriptionId} for move with id "${moveId}`,
        });
    } else {
      await description.destroy();
      res.json(description);
    }
  }
});

module.exports = router;

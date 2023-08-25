const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.127017/jiu-jitsu-journal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch(console.error);

const Move = require("./models/moves");

app.get("/moves", async (req, res) => {
  const moves = await Move.find();

  res.json(moves);
});

app.post("/move/new", (req, res) => {
  const move = new Move({
    text: req.body.text,
  });

  move.save();

  res.json(move);
});

app.delete("/move/delete/:id", async (req, res) => {
  const result = await Move.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.listen(3001, () => console.log("Server started on port 3001"));

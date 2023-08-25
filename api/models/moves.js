const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Move = require("./move");

const MoveSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Style: {
    type: String,
    required: true,
    enum: ["Gi", "No-Gi"],
  },
  Position: {
    type: String,
    required: true,
    enum: [
      "Mount",
      "Side Control",
      "Back Mount",
      "Full Guard",
      "Half Guard",
      "Quarter Guard",
      "Knee On Belly",
      "Turtle",
    ],
  },
  Submission: {
    type: Boolean,
    default: true,
  },
  Description: {
    type: String,
  },
});

// Virtuals
MoveSchema.virtual("moves", {
  ref: "move",
  localField: "_id",
  foreignField: "move",
});

//hooks
MoveSchema.post("findOneAndDelete", function () {
  Move.deleteMany({ move: this._conditions.id }).then((deleteStatus) => {
    console.log(deleteStatus);
  });
});

const Moves = mongoose.model("Move", MoveSchema);
module.exports = Moves;

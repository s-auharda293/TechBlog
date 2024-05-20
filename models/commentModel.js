const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Comments cannot be empty!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: true,
    toObject: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

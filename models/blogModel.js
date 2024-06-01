// title: String, required
// content: String, required (body of the blog post)
// author: ObjectId (references User), required
// tags: [String] (array of tags/keywords)
// createdAt: Date, default to current date
// updatedAt: Date, default to current date
// comments: [ObjectId] (references Comment)
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have a title"],
      unique: true,
      maxlength: [
        50,
        "A blog title must have less than or equal to 50 characters",
      ],
      minlength: [
        10,
        "A blog title must be more than or equal to 10 characters",
      ],
    },
    content: {
      type: String,
      required: [true, "A blog must have content"],
      minlength: [30, "A blog must have more than or equal to 30 characters"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Blog must belong to a user"],
    },

    tags: { type: String },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    image: { type: [String], default: "pexels-agk42-2599244.jpg" },
    // comments
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

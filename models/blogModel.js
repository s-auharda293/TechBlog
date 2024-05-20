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
        40,
        "A blog title must have less than or equal to 40 characters",
      ],
      minlength: [
        10,
        "A blog title must be more than or equal to 10 characters",
      ],
    },
    content: {
      type: String,
      required: [true, "A blog must have a title"],
      unique: true,
      minlength: [100, "A blog must have more than or equal to 100 characters"],
    },
    // author: {},
    tags: { type: String },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    image: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
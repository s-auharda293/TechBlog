// comments: [ObjectId] (references Comment)
const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have a title"],
      unique: true,
      maxlength: [
        100,
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
      minlength: [10, "A blog must have more than or equal to 30 characters"],
    },
    // author: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    //   required: [true, "Blog must belong to a user"],
    // },
    slug: String,
    tags: { type: String },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    image: { type: [String] },
    // comments
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

blogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;

const mongoose = require("mongoose"),
  slugify = require("slugify"),
  marked = require("marked"),
  createDomPurify = require("dompurify"),
  { JSDOM } = require("jsdom"),
  domPurify = createDomPurify(new JSDOM().window);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    featuredImageLocation: {
      type: String,
    },
    featuredImageTag: {
      type: String,
    },
    featuredImageKey: {
      type: String,
    },
    text: {
      type: String,
    },
    sanitizedHTML: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    categories: {
      type: [String],
    },
    rating: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      required: false,
    },
    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.text) {
    this.sanitizedHTML = domPurify.sanitize(marked(this.text));
  }
  next();
});

module.exports = mongoose.model("BlogPost", blogSchema);

const mongoose = require("../db/connection");

const ProjectSchema = mongoose.Schema({
  image: String,
  author: String,
  title: String,
  description: String,
  category: String,
  materials: Array,
  budget: String,
  video: {
    href: String,
  },
  gallery: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;

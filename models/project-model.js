const mongoose = require("../connection");

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
  gallery: [],
  comments: [],
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;

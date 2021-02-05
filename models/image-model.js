const mongoose = require("../db/connection");

const ImageSchema = mongoose.Schema({
  url: String,
  caption: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;

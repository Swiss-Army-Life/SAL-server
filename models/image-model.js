const mongoose = require("../db/connection");

const ImageSchema = mongoose.Schema({
  url: String,
  caption: String,
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;

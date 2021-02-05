const mongoose = require("../db/connection");
const CommentSchema = mongoose.Schema({
  username: String,
  text: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;

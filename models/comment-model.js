const mongoose = require("../db/connection");

const CommentSchema = mongoose.Schema({
  username: String,
  text: String,
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;

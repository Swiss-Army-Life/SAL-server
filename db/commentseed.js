const Model = require("../models/comment-model");
const comments = require("./comments.json");

Model.deleteMany({})
  .then(() => {
    return Model.insertMany(comments);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
//test

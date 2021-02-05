const Model = require("../models/image-model");
const images = require("./images.json");

Model.deleteMany({})
  .then(() => {
    return Model.insertMany(images);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });

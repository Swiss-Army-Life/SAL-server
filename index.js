const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");

const app = express();
const projectRoute = require("./controllers/project");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());

// routes -----

app.use("/project", projectRoute);

app.get("/", (req, res) => {
  res.send("home");
});

// routes --------

app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}🌟`);
});

// DO NOT REMOVE THIS LINE:
module.exports = app;

//test

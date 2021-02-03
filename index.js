const express = require("express");

const app = express();
const projectRoute = require("./controllers/project");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes -----

app.use("/api/project", projectRoute);

app.get("/", (req, res) => {
  res.send("home");
});

// routes --------

app.set("port", 8000);
app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}🌟`);
});

// DO NOT REMOVE THIS LINE:
module.exports = app;

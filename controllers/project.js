const express = require("express");
const projectRouter = express.Router();
const Projects = require("../models/project-model");

// CRUD PROJECT ROUTES

// retrieve specific project
projectRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Projects.findById({ _id: id }).then((project) => res.send(project));
});

// retrieve by category
projectRouter.get("/cat/:cat", (req, res) => {
  let cat = req.params.cat;
  cat = cat.split("");
  cat[0] = cat[0].toUpperCase();
  const category = cat.join("");
  Projects.find({ category: category })
    .then((project) => res.send(project))
    .catch(console.error);
});

// retrieve by description search
projectRouter.get("/search/:search", (req, res) => {
  const search = req.params.search;
  Projects.find({})
    .then((project) => {
      const filteredprojects = project.filter((project) =>
        project.description.includes(search)
      );
      res.send(filteredprojects);
    })
    .catch(console.error);
});

// create a project
projectRouter.post("/", (req, res, next) => {
  console.log(req.body);
  Projects.create(req.body)
    .then((project) => {
      return res.json(project);
    })
    .then(() => res.redirect("/"))
    .catch(console.error);
});

// update a project
projectRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  Projects.findByIdAndUpdate({ _id: id }, updates, { new: true })
    .then(() => Projects.findById({ _id: id }))
    .then((project) => res.json(project))
    .catch(console.error);
});

// delete a project
projectRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Projects.findByIdAndRemove({ _id: id })
    .then(() => Projects.findById({ _id: id }))
    .then((project) => res.json(project))
    .catch(next);
});

module.exports = projectRouter;

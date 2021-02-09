const express = require("express");
const projectRouter = express.Router();
const Projects = require("../models/project-model");
const Comment = require("../models/comment-model");
const Image = require("../models/image-model");
const Project = require("../models/project-model");
// CRUD PROJECT ROUTES
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
      return res.json(filteredprojects);
    })
    .catch(console.error);
});
// create a project
projectRouter.post("/addproject", (req, res, next) => {
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

// STRETCH PROJECT ROUTES
// show all comments
projectRouter.get("/comments", (req, res, next) => {
  Comment.find({})
    .then((comments) => res.json(comments))
    .catch(next);
});
// show a specific comment
projectRouter.get("/comments/:id", (req, res, next) => {
  Comment.findById(req.params.id)
    .then((comments) => res.json(comments))
    .catch(next);
});

// posting comment to a project page
projectRouter.post("/addcomment/:id", (req, res) => {
  const id = req.params.id;
  const newComment = req.body;
  newComment.project = id;
  Comment.create(newComment)
    .then((newcomment) => {
      Projects.findByIdAndUpdate(
        { _id: id },
        { $push: { comments: newcomment._id } },
        { new: true, useFindAndModify: false }
      )
        .then((project) => project.populate("comments", "-_id -__v"))
        .catch(console.error);
    })
    .catch(console.error);
});

//deleting a comment on a project page
projectRouter.delete("/deletecomment/:id", (req, res) => {
  const id = req.params.id;
  Comment.findByIdAndRemove({ _id: id })
    .then((deletedcomment) => {
      Project.findByIdAndUpdate(
        deletedcomment.project,
        {
          $pull: {
            comments: deletedcomment._id,
          },
        },
        { new: true, useFindAndModify: false }
      ).then((project) => res.json(project));
    })
    .catch(console.error);
});

//posting images in a project gallery
projectRouter.post("/addphoto/:id", (req, res) => {
  const id = req.params.id;
  const newImage = req.body;
  newImage.project = id;
  Image.create(req.body)
    .then((newimage) => {
      Projects.findByIdAndUpdate(
        { _id: id },
        { $push: { gallery: image._id } },
        { new: true, useFindAndModify: false }
      )
        .then((project) => project.populate("gallery", "-_id -__v"))
        .catch(console.error);
    })
    .catch(console.error);
});

// deleting an image from a project's gallery
projectRouter.delete("/deletephoto/:id", (req, res) => {
  const id = req.params.id;
  Image.findByIdAndRemove({ _id: id })
    .then((deletedphoto) => {
      Project.findByIdAndUpdate(
        deletedphoto.project,
        {
          $pull: {
            gallery: deletedphoto._id,
          },
        },
        { new: true, useFindAndModify: false }
      ).then((project) => res.json(project));
    })
    .catch(console.error);
});

// retrieve specific project
projectRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Projects.findById({ _id: id }).then((project) => res.send(project));
});

module.exports = projectRouter;

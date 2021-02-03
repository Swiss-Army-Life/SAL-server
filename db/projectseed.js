const Model = require('../models/project-model')
const projects = require('./project.json')

Model.deleteMany({})
.then( () => {
    return Model.insertMany(projects)
})
.then(console.log)
.catch(console.error)
.finally(() => {process.exit()})

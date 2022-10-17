const app = require("express").Router();

const notesRouter = require("./notes");

app.use("/api", notesRouter);

module.exports = app;

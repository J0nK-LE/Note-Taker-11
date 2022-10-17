const app = require('express').Router()


const notesRouter = require('./notes');


// const app = express();

app.use('/api', notesRouter);


module.exports = app;

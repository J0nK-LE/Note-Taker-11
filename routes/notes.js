const notes = require('express').Router();
let db = require("../db/db.json")
const fs = require("fs")
// const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/notes', (req, res) => {
    console.info(`${req.method} note added`);
    db=JSON.parse( fs.readFileSync('./db/db.json'));
    res.json(db)
});

notes.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
    console.log(req.body);

    const { title, text,} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id:Math.floor(Math.random()*1999)
        };
        db.push(newNote)

        fs.writeFileSync('./db/db.json',JSON.stringify(db),function(err){
            if(err) console.error(err)
        });
        res.json(db);
    } else {
        res.error('Error in adding Note');
    }
});

notes.delete('/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete a not`);

    let tempDB = []
    db.forEach(note => {
        if(note.id != req.params.id){
            tempDB.push(note)
        }
    })

        db = tempDB

        fs.writeFileSync('./db/db.json',JSON.stringify(db),function(err){
            if(err) console.error(err)
        });
        res.json(db);

});

module.exports = notes;
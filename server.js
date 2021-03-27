// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const dbJSON = require("./data_poc/db.json");



//var noteData = require("../data_poc/noteData");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));



// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  //res.json(dbJSON);
});



app.get("/api/note", function(req, res) {
  res.json(dbJSON);
});

app.post("/api/notes", function(req, res) {
  // Validate request body
  if(!req.body.title) {
    return res.json({error: "Missing required title"});
  }


//module.exports = function(app) {
  
  
  //api routes go here
// app.get("/api/notes", function(req, res) {
//   res.json(dbJSON);
// });

// app.post("/api/notes", function(req, res){
//   noteData.push(req.body);
//   console.log("data posted");
// });

// };

 //api/note
  //api/notes
  //api/note: note

  // Copy request body and generate ID
  const note = {...req.body, id: uuidv4()}

  // Push note to dbJSON array - saves data in memory
  dbJSON.push(note);

  // Saves data to file by persisting in memory variable dbJSON to db.json file.

  // This is needed because when we turn off server we loose all memory data like pbJSON variable.
  // Saving to file allows us to read previous notes (before server was shutdown) from file.
  fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(dbJSON), (err) => {
    if (err) {
      return res.json({error: "Error writing to file"});
    }

    return res.json(note);
  });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
}); //catch all, should be last "get" in file

app.delete("/api/notes/:id", function (req, res) {
  let newId = req.params.id;
  dbJSON = dbJSON.filter(function (note) {
    if (newId !== note.id) {
      return true;
    }
    else{
      return false;
    }
  });
  console.log(dbJSON);
  fs.writeFile("db/db.json". jSON.stringify(dbJSON), function (error) {
    if (err)
    throw err;
    return res.json(true);
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

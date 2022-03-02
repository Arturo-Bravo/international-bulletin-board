const express = require("express"); //Line 1
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express(); //Line 2
const port = process.env.PORT || 6000; //Line 3
const db = require("../db/database");

app.use(cors());
app.use(bodyParser.json());

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  await db.createNoteTable();
}); //Line 6

// create a GET route
app.post("/translate", (req, res) => {
  //Line 9
  const axios = require("axios");
  console.log(req.body);
  var message = req.body.data;
  var lan = req.body.lan;
  const translate = require("deepl");
  const key = "958e4684-90e8-4a43-869b-c5a5fed4980c:fx";
  translate({
    text: message,
    target_lang: lan,
    auth_key: key,
  }).then((response) => {
    console.log(response.data.translations[0].text, "response");
    res.send({ message: response.data.translations[0].text });
  });
});
app.post("/getnote", async (req, res) => {
  //Line 9
  console.log(req.body);
  let note_id = req.body.note_id;
  await db.insertBoardNote("English", "Red", "Hello"); // Just to make sure there is always a note to retrieve
  await db.insertBoardNote("spanish", "green", "I really like dogs");
  const data = await db.getNote(note_id);
  res.send(data);
});

app.get("/getall", async (req, res) => {
  const data = await db.getBoardNotes();
  console.log(data);
  res.send(data);
});

app.post("/savenote", async (req, res) => {
  //Line 9
  const axios = require("axios");
  console.log(req.body);
  var message = req.body.data;
  var lan = req.body.lan;
  await db.insertBoardNote("English", "Red", "Hello");
  await db.insertBoardNote("spanish", "green", "I really like dogs");
  await db.insertBoardNote("German", "blue", "Lets go home");
  const results = await db.getBoardNotes();
  console.log(results);
  res.send(results);
});

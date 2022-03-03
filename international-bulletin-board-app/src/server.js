const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.argv[2] || 6000;
const db = require("../db/database");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("build"));

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  await db.createNoteTable();
});

app.post("/translate", (req, res) => {
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

app.get("/getnote", async (req, res) => {
  let note_id = req.query.note_id;
  try {
    const data = await db.getNote(note_id);
    res.send(data);
  } catch (error) {
    console.error(`Error feteching reply notes from database: ${error}`);
  }
});

app.get("/getall", async (req, res) => {
  try {
    const data = await db.getBoardNotes();
    res.send(data);
  } catch (error) {
    console.error(`Error retrieving board notes: ${error}`);
  }
});

app.post("/savenote", async (req, res) => {
  let message = req.body.data;
  let lan = req.body.lan;
  let color = req.body.color;
  try {
    const result = await db.insertBoardNote(lan, color, message);
    if (result) res.send("Success");
  } catch (error) {
    console.error(`Error inserting board note into database: ${error}`);
  }
});

app.post("/savereplynote", async (req, res) => {
  let message = req.body.data;
  let lan = req.body.lan;
  let color = req.body.color;
  let parent_note_id = req.body.parent_note_id;
  try {
    const result = await db.insertReplyNote(
      lan,
      color,
      message,
      parent_note_id
    );
    if (result) res.send("Success");
  } catch (error) {
    console.error(`Error inserting reply note into database: ${error}`);
  }
});

app.get("/getreplies", async (req, res) => {
  let parent_note = req.query.parent_note;
  try {
    const result = await db.getReplyNotes(parent_note);
    res.send(result);
  } catch (error) {
    console.error(`Error feteching reply notes from database: ${error}`);
  }
});

app.get("/getreplycount", async (req, res) => {
  let parent_note = req.query.parent_note;
  try {
    const result = await db.getReplyNoteCount(parent_note);
    res.send(result);
  } catch (error) {
    console.error(`Error feteching reply note count from database: ${error}`);
  }
});

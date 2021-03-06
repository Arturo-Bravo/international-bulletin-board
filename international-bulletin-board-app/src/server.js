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

app.get("/translate", (req, res) => {
  const axios = require("axios");
  let message = req.query.message;
  let lan = req.query.language;
  const URI = `https://api-free.deepl.com/v2/translate?auth_key=958e4684-90e8-4a43-869b-c5a5fed4980c:fx&text=${message}&target_lang=${lan}`;
  const url = encodeURI(URI);
  axios
    .get(url, {
      headers: {
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(
      (response) => {
        res.send({
          message: response.data.translations[0].text,
          detected_language:
            response.data.translations[0].detected_source_language,
        });
      },
      (error) => {
        console.log(error);
      }
    );
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

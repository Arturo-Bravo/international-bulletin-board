const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express(); 
const port = process.env.PORT || 6000;
const db = require("../db/database");

app.use(cors());
app.use(bodyParser.json());

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  await db.createNoteTable();
});

app.get("/translate", (req, res) => {
  const axios = require("axios");
  let message = req.query.message;
  var lan = req.query.language;
  const URI = `https://api-free.deepl.com/v2/translate?auth_key=958e4684-90e8-4a43-869b-c5a5fed4980c:fx&text=${message}&target_lang=${lan}`;
  const url = encodeURI(URI);
  axios.get(url,
    {
        headers: {
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
        },
    }
    )
    .then(
        (response) => {
            res.send({message: response.data.translations[0].text, detected_language: response.data.translations[0].detected_source_language})
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
  const data = await db.getBoardNotes();
  res.send(data);
});

app.post("/savenote", async (req, res) => {
  const axios = require("axios");
  let message = req.body.data;
  let lan = req.body.lan;
  let color = req.body.color;
  await db.insertBoardNote(lan, color, message);
  const results = await db.getBoardNotes();
  console.log(results);
  res.send("Success");
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

//var message = req.body.data;
  /*
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
  */

/*
    axios.get(`https://api-free.deepl.com/v2/translate?auth_key=958e4684-90e8-4a43-869b-c5a5fed4980c:fx&text=${message}, world&target_lang=${lan}`,
    {
        headers: {
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
        },
    }
    )
    .then(
        (response) => {
            console.log(response.data.translations[0].text, "response");
            res.send({message: response.data.translations[0].text})
        },
        (error) => {
            console.log(error);
        }
    );
*/

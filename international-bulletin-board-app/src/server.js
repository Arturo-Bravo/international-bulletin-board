const express = require("express"); //Line 1
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express(); //Line 2
const port = process.env.PORT || 6000; //Line 3
const db = require("../db/database");

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

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
    // All optional parameters available in the official documentation can be defined here as well.
  }).then((response) => {
    console.log(response.data.translations[0].text, "response");
    res.send({ message: response.data.translations[0].text });
  });
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

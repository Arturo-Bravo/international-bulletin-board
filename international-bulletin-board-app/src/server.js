const express = require('express'); //Line 1
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express(); //Line 2
const port = process.env.PORT || 6000; //Line 3
const db = require('../db/database'); 

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.post('/translate', (req, res) => { //Line 9
    const axios = require("axios");
    console.log(req.body); 
    var message = req.body.data;
    var lan = req.body.lan; 
    const translate = require("deepl");
    const key = "958e4684-90e8-4a43-869b-c5a5fed4980c:fx"
    translate({
        text: message,
        target_lang: lan,
        auth_key: key,
    })
    .then(response => {
        console.log(response.data.translations[0].text, "response");
        res.send({message: response.data.translations[0].text})
    })
});
app.get('/getnote', async (req, res) => { //Line 9
    console.log(req.body); 
    var message = req.body.data;
    var lan = req.body.lan
    const data = await db.getNote("1234"); 
});

app.get('/getnotes', async (req, res) => { //Line 9
    console.log(req.body); 
    var message = req.body.data;
    var lan = req.body.lan
    const data = await db.getBoardNotes();
    console.log(data);
    res.send(data); 
});

app.post('/savenote', async (req, res) => { //Line 9
    const axios = require("axios");
    console.log(req.body); 
    var message = req.body.data;
    var lan = req.body.lan;
    await db.createNoteTable(); 
    await db.insertBoardNote("English", "Red", "Hello");    
    await db.insertBoardNote("spanish", "green", "I really like dogs");
    await db.insertBoardNote("German", "blue", "Lets go home");
    const results = await db.getBoardNotes();
    console.log(results);
    res.send("Success"); 
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

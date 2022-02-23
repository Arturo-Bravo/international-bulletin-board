const express = require('express'); //Line 1
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express(); //Line 2
const port = process.env.PORT || 6000; //Line 3


app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.post('/backend', (req, res) => { //Line 9
  const axios = require("axios");
    var message = req.body.data;
    //var lan = req.body.language
    console.log(req.body); 
    axios.get(`https://api-free.deepl.com/v2/translate?auth_key=958e4684-90e8-4a43-869b-c5a5fed4980c:fx&text=${message}, world&target_lang=DE`,
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
}); //Line 11



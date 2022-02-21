const express = require("express");
const app = express();
const port = 6000;

app.get("/", (res,req) => {
    var data = "hello"
    res.send({data});
    }
);
app.listen(port, () => console.log(`Listening on port ${port}`));
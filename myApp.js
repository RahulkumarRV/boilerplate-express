let express = require('express');
let url = require("url");
let app = express();
require('dotenv').config();
const bodyParser = require
("body-parser");
const { json } = require('body-parser');


app.use("/public",express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=>{
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
    const data = {"message": "Hello json"};
    if(process.env.MESSAGE_STYLE === 'uppercase'){
        data.message = data.message.toUpperCase();
    }
    res.json(data);

});


app.get("/now",(req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({
        time: req.time
    });
});

app.get("/:word/echo", (req, res) => {
    res.send({
        echo: req.params.word
    });
});

app.get("/name", (req, res) => {
    const fullName = req.query.first + " " + req.query.last;
    res.send({
        name: fullName
    });
});

app.post("/name", (req, res) => {
    res.send({
        name: req.body.first + " " + req.body.last
    });
});

app.get("/api/whoami", (req, res) => {
    const queryObject = req.headers;
    res.json({
        ipaddress: req.headers['x-forwarded-for'].split(',')[0],
        language : queryObject["accept-language"],
        software : queryObject["user-agent"]
    });
});


























 module.exports = app;

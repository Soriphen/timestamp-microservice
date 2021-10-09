// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const { response } = require("express");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// When the route path has no date or utc provided, current time is provided as default
app.get("/api", (req, res) => {
  let responseObject = {};
  responseObject["unix"] = new Date().getTime();
  responseObject["utc"] = new Date().toUTCString();

  res.json(responseObject);
});

app.get("/api/:date?", (req, res) => {
  let responseObject = {};
  // Setting up route
  let date_string = req.params.date;

  // Creating date string and storing it in responseObject

  if (/^\d+$/.test(date_string)) {
    // Timestamp
    date_string = parseInt(date_string, 10);
    responseObject["unix"] = new Date(date_string).getTime();
    responseObject["utc"] = new Date(date_string).toUTCString();
  } else {
    responseObject["unix"] = new Date(date_string).getTime();
    responseObject["utc"] = new Date(date_string).toUTCString();
  }

  // If the returned value of responseObject is undefined/null, return an error message
  if (!responseObject["unix"] || !responseObject["utc"]) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json(responseObject);
  }

  console.log(date_string);
  console.log(responseObject);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");



const jsonData = require("./app/data/data.json")

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require("./app/models");
const GameGuide = db.gameGuides;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");

    jsonData.forEach(jsonObj => {
      const gameGuide = new GameGuide({
        guideName: jsonObj.guideName,
        gameName: jsonObj.gameName,
        description: jsonObj.description,
        published: jsonObj.published,
      });
      gameGuide
        .save(gameGuide)
        .then(data => {
          console.info("insert", data)
        })
        .catch(err => {
          console.error(err)
        });
    })
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to gameRevCrud application."
  });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/gameGuide.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
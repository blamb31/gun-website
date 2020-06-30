const express = require("express");
const app = express();
var session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const mongoose = require("mongoose");
require("dotenv").config();

const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env;

const authCtrl = require("./controllers/auth");
const testCtrl = require("./controllers/test");

mongoose.connect("mongodb://127.0.0.1/gun-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB IS CONNECTED");
  app.listen(SERVER_PORT, () =>
    console.log(`Server listening on port: ${SERVER_PORT}`)
  );
  app.set("db", db);
});

app.use(express.static(`${__dirname}/../build`));
app.use(express.json());
app.use(bodyParser.json());

var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  })
);

app.get("/auth/login", authCtrl.login);
app.post("/test/testPost", testCtrl.testPost);
app.get("/test/testGet", testCtrl.testGet);
// app.get("/auth/checkLoggedIn", authCtrl.checkLoggedIn);

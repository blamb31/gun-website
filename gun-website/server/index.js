const express = require("express");
const app = express();
var session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const mongoose = require("mongoose");
require("dotenv").config();

const { SESSION_SECRET, SERVER_PORT } = process.env;

const gunsCtrl = require("./controllers/guns");
const userCtrl = require("./controllers/user");

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

app.get("/user/getUser/:userEmail", userCtrl.getUser);
app.post("/user/setSessionUser", userCtrl.setSessionUser);
app.post("/user/createUser", userCtrl.createUser);
app.get("/user/checkUser", userCtrl.checkSession);

app.get("/guns/getGuns", gunsCtrl.getAll);
app.get("/guns/getGuns/:ownerId", gunsCtrl.getGunsByOwnerId);
app.get("/guns/getGun/:gunId", gunsCtrl.getGunById);
app.get("/guns/getGun", gunsCtrl.getGunById);
app.post("/guns/createGun", gunsCtrl.createGun);
app.put("/guns/updateGun", gunsCtrl.editGunById);
app.delete("/guns/deleteGun/:gunId", gunsCtrl.deleteGunById);

const express = require("express");
const app = express();
var session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const { auth, requiresAuth } = require("express-openid-connect");

require("dotenv").config();

const { SESSION_SECRET, SERVER_PORT } = process.env;

const testCtrl = require("./controllers/test");

// const db = await massive({
//   host: "127.0.0.1",
//   port: 5432,
//   database: "appdb",
//   user: "appuser",
//   password: "apppwd",
// });

app.listen(SERVER_PORT, () =>
  console.log(`Server is listening at http://localhost:${SERVER_PORT}`)
);

const config = {
  required: false,
  auth0Logout: true,
  appSession: {
    secret: SESSION_SECRET,
  },
  baseURL: "http://localhost:4000",
  clientID: "G8Xu6da8qgjGzGhpMle1fVZIek6kOV1z",
  issuerBaseURL: "https://blake-lamb.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.isAuthenticated() ? "Logged in" : "Logged out");
});
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
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

app.get("/test/test1", testCtrl.getTest1);

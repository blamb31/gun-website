const express = require("express");
const app = express();
var session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");

require("dotenv").config();

const { SESSION_SECRET, SERVER_PORT } = process.env;

const authCtrl = require("./controllers/auth");

// const db = await massive({
//   host: "127.0.0.1",
//   port: 5432,
//   database: "appdb",
//   user: "appuser",
//   password: "apppwd",
// });

// auth router attaches /login, /logout, and /callback routes to the baseURL

// req.isAuthenticated is provided from the auth router

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

massive(CONNECTION_STRING).then((db) => {
  app.set("db", db);
  console.log(`The DB is connected!`);
  app.listen(SERVER_PORT, () =>
    console.log(`Server listening on port: ${SERVER_PORT}`)
  );
});

// app.listen(SERVER_PORT, () =>
//   console.log(`Server is listening at http://localhost:${SERVER_PORT}`)
// );

app.get("/auth/login", authCtrl.login);
// app.get("/auth/checkLoggedIn", authCtrl.checkLoggedIn);

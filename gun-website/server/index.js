const express = require("express");
const app = express();
var session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");

// require("dotenv").config();

const { SESSION_SECRET, SERVER_PORT } = process.env;

const testCtrl = require("./controllers/test");

app.listen(4000, () =>
  console.log(`Server is listening at http://localhost:${4000}`)
);

app.use(express.static(`${__dirname}/../build`));
app.use(express.json());
app.use(bodyParser.json());

var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// //CORS Middleware
// app.use(function (req, res, next) {
//   //Enabling CORS
//   res.header("Access-Control-Allow-Origin", "*");
//   // res.header(“Access-Control-Allow-Origin”, “*”);
//   // res.header(“Access-Control-Allow-Methods”, “GET,HEAD,OPTIONS,POST,PUT”);
//   // res.header(“Access-Control-Allow-Headers”, “Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization”);
//   next();
// });

app.use(
  session({
    secret: "asdasdasd",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  })
);

app.get("/test/test1", testCtrl.getTest1);

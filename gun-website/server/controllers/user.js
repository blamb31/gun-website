const mg = require("mongoose");

const Schema = mg.Schema;

const userSchema = new Schema({
  name: {
    first: String,
    last: String,
  },
  email: String,
});

const userModel = mg.model("userModel", userSchema);

module.exports = {
  getUser: async (req, res) => {
    console.log(req.params);
    const userReturn = mg.model("userModel", userSchema);
    const user = await userReturn.findOne({ email: req.params.userEmail });
    console.log({ user });
    req.session.user = null;
    req.session.user = user;
    console.log(req.session.user);
    req.session.save();
    res.status(200).send(user);
  },

  checkUser(req, res, next) {
    let { body } = req;
    if (body.isLoggedIn && body.email && body.emailVar) {
      next();
    } else {
      res
        .status(400)
        .send("User isn't logged in or doesn't have a vlaid email.");
    }
  },

  setSessionUser: async (req, res) => {
    // req.session.user = {
    //   email: req.body.email,
    // };
    // const userReturn = mg.model("userModel", userSchema);
    // const user = await userReturn.findOne({ email: req.params.userEmail });
    // console.log("hihi", user);
    // if (user) {
    //   console.log({ user });
    //   console.log("hi", req.session.user);
    //   req.session.user.id = user._id;
    // }
    // res.status(200).send(user);
    console.log(req.session.user);
  },

  createUser: async (req, res) => {
    const userReturn = mg.model("userModel", userSchema);
    console.log({ hi: req.body });
    const newUser = new userModel({
      name: {
        first: req.body.user.given_name,
        last: req.body.user.family_name,
      },
      email: req.body.user.email,
    });
    newUser.save((err) => {
      if (err) {
        res.status(400).send(err);
        return err;
      } else {
        res.status(200).send({ message: "The User was created", newUser });
      }
    });
    res.status(200).send(newUser);
  },
  checkSession: async (req, res) => {
    console.log({ session: req.session.user });
    res.send(req.session.user);
  },
};

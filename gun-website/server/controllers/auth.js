module.exports = {
  login: async (req, res) => {
    // console.log(req.body, req.session);
    req.session.user = req.body.user;
    console.log(req.session.user);
    req.session.user.loggedIn = true;
    res.send(req.session.user);
  },
  currentUser: async (req, res) => {
    if (req.session.user) {
      console.log("hit1");
      res.send(req.session.user);
    } else {
      console.log("hit2");

      res.status(404).send("No User is logged in");
    }
  },
  checkLoggedIn: async (req, res) => {
    console.log(req.session);

    res.status(200).send(req.session.user.loggedIn);
  },
  logout: async (req, res) => {
    console.log("hit4");

    delete req.session.user;
    res.status(200).send("Logged out the user");
  },
};

module.exports = {
  login: async (req, res) => {
    res.send(req.session);
  },
};

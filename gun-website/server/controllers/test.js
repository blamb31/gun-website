module.exports = {
  getTest1: async (req, res, next) => {
    console.log("hit the backend");
    res.send({ test: "This is Test 1" });
  },
};

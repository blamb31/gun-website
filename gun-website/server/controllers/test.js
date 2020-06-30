const mg = require("mongoose");

const Schema = mg.Schema;
const testModelSchema = new Schema({
  id: String,
  some_string: String,
  some_date: Date,
});
const testMflixModelSchema = new Schema({
  _id: { type: String },
  name: String,
  email: Date,
  movie_id: { type: String },
  text: String,
  date: Date,
});
const testMflixModel = mg.model("MflixModel", testMflixModelSchema);
const testModel = mg.model("testModel", testModelSchema);
module.exports = {
  testPost: async (req, res, next) => {
    console.log("hit post");

    const test_instance = new testModel({
      id: "12",
      some_string: "This is a test",
      some_date: new Date(),
    });
    test_instance.save((err) => {
      if (err) {
        return handleError(err);
      }
    });
    res.send({ message: "the function finished", obj: test_instance });
  },
  testGet: async (rew, res, next) => {
    console.log("hit get");
    const testReturn = mg.model("testMflixModel", testMflixModelSchema);

    testReturn.find(
      { name: "Andrea Le" },
      "name _id email movie_id text date ",
      function (err, testReturnObj) {
        if (err) {
          return handleError(err);
        }
        if (testReturnObj) {
          res.send({ testReturnObj });
        }
      }
    );
  },
};

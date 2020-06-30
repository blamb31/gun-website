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
const testModel = mg.model("testModel", testModelSchema);
const testMflixModel = mg.model("MflixModel", testMflixModelSchema);

function testPost() {
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
  return { message: "the function finished", obj: test_instance };
}
function testGet() {
  const testReturn = mg.model("testModel", testModelSchema);

  tRet = testReturn.find({ id: "12" }, "some_string some_date", function (
    err,
    testReturnObj
  ) {
    if (err) {
      return handleError(err);
    }
  });
  return tRet;
}
function testGetMflix() {
  const testReturn = mg.model("testMflixModel", testMflixModelSchema);

  tRet = testReturn.find(
    { name: "Andrea Le" },
    "_id name email movie_id text date",
    function (err, testReturnObj) {
      if (err) {
        return handleError(err);
      }
    }
  );
  console.log({ tRet });
  return tRet;
}

module.exports({
  testPost,
  testGet,
  testGetMflix,
});

const mg = require("mongoose");

const Schema = mg.Schema;

const gunSchema = new Schema({
  name: String,
  dateAdded: String,
  location: {
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  tags: Array,
  owner_Id: {
    id: String,
    first: String,
    last: String,
    email: String,
  },
  price: mg.Decimal128,
  picture: String,
  description: String,
  phone: String,
});

const gunModel = mg.model("gunModel", gunSchema);

module.exports = {
  createGun: async (req, res) => {
    const { body } = req;
    if (body && body.location) {
      const new_gun = new gunModel({
        name: body.name,
        dateAdded: body.dateAdded,
        location: {
          address: body.location.address,
          city: body.location.city,
          state: body.location.state,
          zip: body.location.zip,
        },
        tags: body.tags,
        owner_Id: {
          id: body.owner_Id.id,
          first: body.owner_Id.first,
          last: body.owner_Id.last,
          email: body.owner_Id.email,
        },
        price: body.price,
        picture: body.picture,
        description: body.description,
        phone: body.phone,
      });
      new_gun.save((err) => {
        if (err) {
          res.status(400).send(err);
          return err;
        }
      });
      res.send({ message: "the gun was created", obj: new_gun });
    } else {
      res.status("400").send("Body Format was incorrect");
    }
  },

  getAll: async (req, res) => {
    const gunReturn = mg.model("gunModel", gunSchema);

    const all = await gunReturn.find({});
    for (const gun of all) {
    }
    res.send(all);
  },

  getGunById: async (req, res) => {
    const gunReturn = mg.model("gunModel", gunSchema);
    const gun = await gunReturn.findById(req.params.gunId);

    res.send(gun);
  },
  getGunsByOwnerId: async (req, res) => {
    const gunReturn = mg.model("gunModel", gunSchema);
    const { ownerId } = req.params;
    const gun = await gunReturn.find({
      "owner_Id.id": ownerId,
    });

    res.send(gun);
  },
  editGunById: async (req, res) => {
    const gunReturn = mg.model("gunModel", gunSchema);
    // const gun = await gunReturn.findOneAndUpdate(req.body.id, req.body.changes);
    const gun = await gunReturn.findOneAndUpdate(
      { _id: req.body.gunId },

      req.body.gun,

      { new: true, useFindAndModify: false }
    );

    res.status(200).send(gun);
  },
  deleteGunById: async (req, res) => {
    const gunReturn = mg.model("gunModel", gunSchema);
    const { gunId } = req.params;
    const gun = await gunReturn.findOneAndDelete({
      _id: gunId,
    });

    res.status(200).send(gun);
  },
};

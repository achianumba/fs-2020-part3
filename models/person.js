const { connect, Schema, model, set } = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const connectToDb = () => {
  return connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) =>
      console.error("FAILED TO CONNECTED TO MONGODB", err.message)
    );
};

const personSchema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, required: true, minlength: 8 },
});

personSchema.plugin(mongooseUniqueValidator);

//transform object types
personSchema.set("toJSON", {
  transform: function (document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//handle deprecation warnings
set(`useFindAndModify`, false);
set(`useCreateIndex`, true);

const Person = model("Person", personSchema);

//fetch all persons
const getPersons = () => {
  return Person.find();
};
//find One person
const getPerson = (personName) => {
  return Person.findOne({ name: personName });
};
//get by id
const getPersonById = (id) => {
  return Person.findById(id);
};
//create new person from controller
const addPerson = (personObject) => {
  return new Person(personObject).save();
};
//update person
const updatePerson = (id, newNumber) => {
  return Person.findByIdAndUpdate(id, newNumber, { new: true });
};
//remove a person
const deletePerson = (id) => {
  return Person.findByIdAndRemove(id);
};

module.exports = {
  getPersons,
  addPerson,
  deletePerson,
  getPersonById,
  updatePerson,
  connectToDb,
  getPerson,
};

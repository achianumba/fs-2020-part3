const { connect, Schema, model, set } = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
module.exports.getPersons = () => Person.find();
//find One person
module.exports.getPerson = (personName) => Person.findOne({ name: personName });
//get by id
module.exports.getPersonById = (id) => Person.findById(id);
//create new person from controller
module.exports.addPerson = (personObject) => new Person(personObject).save();
//update person
module.exports.updatePerson = (id, newNumber) =>
  Person.findByIdAndUpdate(id, newNumber, { new: true });
//remove a person
module.exports.deletePerson = (id) => Person.findByIdAndRemove(id);

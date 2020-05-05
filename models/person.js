const { connect, Schema, model, connection, set } = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const connectToDb = () => {
  return connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) => console.error("FAILED TO CONNECTED TO MONGODB", err.message));
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
module.exports.getPersons = () => {
  connectToDb();
  return Person.find();
}
//find One person
module.exports.getPerson = (personName) => {
  connectToDb();
  return Person.findOne({ name: personName });
}
//get by id
module.exports.getPersonById = (id) => {
  connectToDb();
  return Person.findById(id);
}
//create new person from controller
module.exports.addPerson = (personObject) => {
  connectToDb();
  return new Person(personObject).save();
}
//update person
module.exports.updatePerson = (id, newNumber) => {
  connectToDb();
  return Person.findByIdAndUpdate(id, newNumber, { new: true });
}
//remove a person
module.exports.deletePerson = (id) => {
  connectToDb();
  return Person.findByIdAndRemove(id);
}
//close db
module.exports.closeDb = () => connection.close(() => console.log('Terminated MongoDD connection successfully'));
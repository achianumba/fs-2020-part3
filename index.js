require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {
  getPersons,
  addPerson,
  deletePerson,
  getPersonById,
  updatePerson,
} = require("./models/person");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("build"));
app.use(cors());

//create a token to display the body of post requests
morgan.token("body", (req) =>
  req.method !== "POST" ? "" : JSON.stringify(req.body)
);

app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms :body`)
);
//get people
app.get("/info", (req, res) => {
  getPersons()
    .then((persons) => {
      res.send(
        `<p>Phonebook has ${
          persons === null || persons.length === 0 ? 0 : persons.length
        } people</p>
            <p>${new Date()}</p>
            `
      );
    })
    .catch((err) => next(err));
});

app.get("/api/persons", (req, res, next) => {
  getPersons()
    .then((phonebook) => {
      if (phonebook === undefined)
        return res.json({ message: "Phonebook is empty" });

      res.json(phonebook.map((person) => person.toJSON()));
    })
    .catch((error) => next(error));
});
//get person
app.get("/api/persons/:id", (req, res, next) => {
  getPersonById(req.params.id)
    .then((person) => {
      if (person === null)
        return res.status(404).json({ error: "Person not found " });

      res.json(person.toJSON());
    })
    .catch((err) => next(err));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//add person
app.post("/api/persons/", (req, res, next) => {
    addPerson(req.body)
      .then((savedPerson) => {
        console.log(savedPerson.toJSON());
        res.json(savedPerson.toJSON());
      })
      .catch(err => {
          next(err);
      });
});

//update person
app.put("/api/persons/:id", (req, res, next) => {
  getPersonById(req.params.id)
    .then((person) => {
      if (person === null) return res.status(404).json({ error: "Not found" });
      console.log(req.params.id, req.body);
      updatePerson(req.params.id, req.body)
        .then((updated) => res.json(updated))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});
//delete person
app.delete("/api/persons/:id", (req, res, next) => {
  deletePerson(req.params.id)
    .then(() => {
      res.status(200).json(req.params.id);
    })
    .catch((err) => next(err));
});
//unknown routes
app.use((req, res, next) => {
    res.status(404).send({ error: "URL not found" });
    next();
  });
//error handler
app.use((err, req, res, next) => {
  console.error('\n', err.message, '\n');

    if (
        (err.name === 'ValidationError') ||
        (err.name === 'CastError')
        ) {
        res.status(400).json({ error: err.message });
    } else {
        res.status(403).json({ error: error.message })
    }
});

app.listen(PORT, console.log(`Server running at ${PORT}`));
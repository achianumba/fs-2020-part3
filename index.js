const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
let persons = require('./persons');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('build'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//create a token to display the body of post requests
morgan.token('body', (req) => req.method !== 'POST' ? '' : JSON.stringify(req.body));

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has ${ persons.length } people</p>
        <p>${ new Date() }</p>
        `
    )
});

app.get('/api/persons', (req, res) => {
    res.json(persons)
});

app.get('/api/persons/:id', (req, res) => {
    let person = persons.find(({ id }) => id === Number(req.params.id));

    if (person) {
        res.json(person);
    } else {
        res.status(404).send('<h2>The requested contact does not exist in Phonebook</h2>')
    }
});

app.delete('/api/persons/:id', (req, res) => {
    let person = persons.some(({ id }) => id === Number(req.params.id));
    
    if (person) {
        persons = persons.filter(({ id }) => id !== Number(req.params.id))
        res.status(204).end();
    } else {
        res.status(404).send('<h2>The contact you are trying to delete does not exist in Phonebook</h2>')
    }
});

app.post('/api/persons/', (req, res) => {
    let { name, number } = req.body;
    console.log(persons.find((person) => person.name === name), persons)

    if (!name || !number) {
        return res.status(400).json({ error: 'Please fill out the name and number fields before saving.'})
    } else if (persons.some((person) => person.name === name)) {
        return res.status(400).json({ error: 'A contact with that name already exists' });
    } else {
        let person = {
            ...req.body,
            id: Math.round(Math.random() * 10000)
        }
        persons = persons.concat(person);
        console.log(person)
        return res.json(person);
    }
});

app.listen(PORT, console.log(`Server running at ${PORT}`));
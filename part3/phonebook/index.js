require("dotenv").config();
const express = require("express");
var morgan = require("morgan");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("build"));

app.use(morgan("tiny"));
app.use(cors());

const Person = require("./models/person");

var persons = [
  {
    id: 1,
    name: "Amin",
    number: "12345",
  },
  {
    id: 2,
    name: "Selim",
    number: "12345",
  },
  {
    id: 3,
    name: "Youssef",
    number: "12345",
  },
  {
    id: 4,
    name: "Yahya",
    number: "12345",
  },
];
//Get the information on the phonebook
app.get("/info", (request, response) => {
  var date = new Date();
  var number = persons.length;
  response.send(
    `<p>Phonebook has info for ${number} people.
   <br/> ${date}
    </p>`
  );
});

//Full phonebook list
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

//Get the info for a single person
app.get("/api/persons/:id", (req, resp, next) => {
  const id = Number(req.params.id);
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        resp.json(person);
      } else {
        resp.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//Delete a person from the phonebook
app.delete("/api/persons/:id", (req, resp) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      resp.status(204).end();
    })
    .catch((error) => next(error));
});

const generateId = () => {
  return Math.floor(Math.random() * 5000);
};

//Add new person
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "must have a name" });
  } else if (!body.number) {
    return response.status(400).json({ error: "must have a number" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

//Modify existing person
app.put("/api/persons/:id", (req, resp, next) => {
  const body = req.body;
  !console.log(body);
  const person = {
    name: body.name,
    number: body.number,
  };
  !console.log(person);

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => resp.json(updatedPerson))
    .catch((error) => next(error));
});

const errorHandler = (error, req, resp, next) => {
  console.log(error);
  if (error.name === "CastError") {
    return resp.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);

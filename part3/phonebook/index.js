const express = require("express");
var morgan = require("morgan");
var cors = require("cors");

app.use(cors());

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

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
  response.json(persons);
});

//Get the info for a single person
app.get("/api/persons/:id", (req, resp) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    resp.send(person);
  } else {
    resp.status(404).end();
  }
});

//Delete a person from the phonebook
app.delete("/api/persons/:id", (req, resp) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  resp.send(`deleted ${person.name} from the list.`);
});

const generateId = () => {
  return Math.floor(Math.random() * 5000);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const checkPersonInList = persons.find((person) => person.name === body.name);
  if (checkPersonInList) {
    return response.status(400).json({ error: "name already exists" });
  } else if (!body.name) {
    return response.status(400).json({ error: "must have a name" });
  } else if (!body.number) {
    return response.status(400).json({ error: "must have a number" });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);

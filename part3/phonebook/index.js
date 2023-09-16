require("dotenv").config()
const express = require("express")
var morgan = require("morgan")
var cors = require("cors")

const app = express()

app.use(express.json())
app.use(express.static("build"))

app.use(morgan("tiny"))
app.use(cors())

const Person = require("./models/person")

const errorHandler = (error, req, resp, next) => {
  console.log(error)
  if (error.name === "CastError") {
    return resp.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return resp.status(400).json({ error: error.message })
  }
  next(error)
}
//Get the information on the phonebook
app.get("/info", (req, resp) => {
  var date = new Date()
  Person.count({}).then((count) =>
    resp.send(`<p>Phonebook has info for ${count} people.
  <br/> ${date}
   </p>`)
  )
})

//Full phonebook list
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons))
})

//Get the info for a single person
app.get("/api/persons/:id", (req, resp, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        resp.json(person)
      } else {
        resp.status(404).end()
      }
    })
    .catch((error) => next(error))
})

//Delete a person from the phonebook
app.delete("/api/persons/:id", (req, resp, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      resp.status(204).end()
    })
    .catch((error) => next(error))
})

//Add new person
app.post("/api/persons", (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

//Modify existing person
app.put("/api/persons/:id", (req, resp, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => resp.json(updatedPerson))
    .catch((error) => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)

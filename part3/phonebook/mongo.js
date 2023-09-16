const mongoose = require("mongoose")
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://admin:${password}@phonebook.b7njfla.mongodb.net/phoneNumberBook?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: { type: String, required: true },
})
const Person = mongoose.model("Person", personSchema)

const person = new Person({
  name: name,
  number: number,
})
if (process.argv[3] === undefined || process.argv[4] === undefined) {
  Person.find({}).then((result) => {
    console.log("Phonebook")
    result.forEach((person) => console.log(person.name, person.number))
    mongoose.connection.close()
  })
} else {
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook.`)
    mongoose.connection.close()
  })
}

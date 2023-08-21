import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Amin", number: "040-123456", id: 1 },
    { name: "Youssef", number: "39-44-5323523", id: 2 },
    { name: "Yahya", number: "12-43-234345", id: 3 },
    { name: "Selim", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
    console.log(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNum,
      id: persons.length + 1,
    };
    const checkPersonExists = persons.some((obj) => obj.name === newName);
    if (checkPersonExists) alert(`${newName} is already in the list.`);
    else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNum("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;

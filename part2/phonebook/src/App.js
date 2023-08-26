import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);
  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const displayedResult = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSetNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleSetNewNum = (event) => {
    setNewNum(event.target.value);
  };
  const handlePersonList = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNum,
      id: persons.length + 1,
    };
    const checkIfPersonOnList = persons.some((obj) => obj.name === newName);

    if (checkIfPersonOnList) {
      alert(`${newName} is already in the list.`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNum("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} handleSearchValue={handleSearchValue} />
      <h2>Add a new</h2>
      <PersonForm
        handlePersonList={handlePersonList}
        newName={newName}
        newNum={newNum}
        handleSetNewName={handleSetNewName}
        handleSetNewNum={handleSetNewNum}
      />
      <h2>Numbers</h2>
      <Persons displayedResult={displayedResult} /> ...
    </div>
  );
};

export default App;

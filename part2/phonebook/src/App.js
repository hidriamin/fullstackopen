import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import Person from "./Person";
import PersonForm from "./PersonForm";
import personService from "./services/Persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    personService.getAll().then((resp) => setPersons(resp));
  }, [persons]);

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
    };
    const checkIfPersonOnList = persons.some((obj) => obj.name === newName);

    if (checkIfPersonOnList) {
      const id = persons.find((person) => person.name === newName)?.id;
      console.log(id);
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        personService.changeNum(id, personObject).then((resp) => {
          setPersons(persons.concat(resp));
          setNewName("");
          setNewNum("");
        });
      }
    } else {
      personService.addPerson(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNum("");
      });
    }
  };

  const deletePerson = (id) => {
    const name = persons.find((person) => person.id === id)?.name;
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .handleDelete(id)
        .then((resp) => {
          setPersons(persons.filter((person) => person.id !== id));
          console.log(resp);
        })
        .catch((error) => {
          console.log("Error!");
        });
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
      <Person
        displayedResult={displayedResult}
        deletePerson={deletePerson}
      />{" "}
      ...
    </div>
  );
};

export default App;

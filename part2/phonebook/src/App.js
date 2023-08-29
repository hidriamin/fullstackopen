import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import Person from "./Person";
import PersonForm from "./PersonForm";
import personService from "./services/Persons";
import "./style.css";
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="success">{message}</div>;
};
const Error = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [notifText, setNotifText] = useState(null);
  const [errorText, setErrorText] = useState(null);

  useEffect(() => {
    personService.getAll().then((resp) => setPersons(resp));
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
    };
    const checkIfPersonOnList = persons.some((obj) => obj.name === newName);

    if (checkIfPersonOnList) {
      const id = persons.find((person) => person.name === newName)?.id;

      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        const person = persons.find((person) => person.id === id);
        const changedPerson = { ...person, number: newNum };
        personService
          .changeNum(id, changedPerson)
          .then((resp) => {
            setPersons(
              persons.map((person) => (person.id === id ? resp : person))
            );
            setNewName("");
            setNewNum("");
            setNotifText(`Changed ${newName}'s number successfully.`);
            setTimeout(() => setNotifText(null), 5000);
          })
          .catch((error) => {
            setErrorText(
              `${newName}'s information has already been removed from the server.`
            );
            setTimeout(() => setErrorText(null), 5000);
          });
      }
    } else {
      personService.addPerson(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNum("");
        setNotifText(`${newName} has been added to the list.`);
        setTimeout(() => setNotifText(null), 5000);
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
          setNotifText(`${name} has been removed from the list.`);
          setTimeout(() => setNotifText(null), 5000);
        })
        .catch((error) => {
          console.log("Error!");
        });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifText} />
      <Error message={errorText} />
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

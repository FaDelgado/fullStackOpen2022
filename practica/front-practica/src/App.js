import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phoneServices from "./services/phones";
import Notification from "./components/Notification";

const App = () => {

  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [message, setMessage] = useState({ message: "", type: "" });

  //2.11 useEffect
  useEffect(() => {
    phoneServices.getData().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleAddName = (event) => {
    setNewName(event.target.value);
  };

  const handleAddPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName || !newPhone) {
      alert("All fields are required!");
      return;
    }

    let isEqual = false;
    persons.forEach((a) => {
      if (
        a.name.length === newName.length &&
        a.name.toLowerCase().includes(newName.toLowerCase())
      ) {
        // alert(`${newName} Name already exists!`);
        // isEqual = true;
        // return;
        if (
          window.confirm(
            `${newName} Name already exists! Replace the old number with a new one?`
          )
        ) {
          const putNewPersonObj = { name: newName, number: newPhone };
          phoneServices.putData(a.id, putNewPersonObj).then((response) => {
            // Se hace el map dentro del setPersons para que se actualice el state
            setPersons(
              // Nuevo array con el objeto modificado, cuando se encuentre el mismo id lo modifica por la respuesta del put
              // sino deja los datos del objeto original
              persons.map((person) =>
                person.id !== response.id ? person : response
              )
            );
          });
        }
        isEqual = true;
        return;
      }
    });
    if (!isEqual) {
      const personObject = { name: newName, number: newPhone };

      phoneServices
        .postData(personObject)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => {
          // this is the way to access the error message
          console.log(error.response.data.error);
          messageResponse(error, 'error');
        });
    }
  };

  const messageResponse = (msgRes, typeMsg) => {
    setMessage({
      ...message,
      message: msgRes.response.data.error,
      type: typeMsg,
    });
    setTimeout(() => {
      setMessage({ ...message, message: "", type: "" });
    }, 3000);
  }

  const deletePerson = (id) => {
    const delPerson = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${delPerson.name}?`)) {
      phoneServices.deleteData(id).then((response) => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification objMessage={message} />
      <Filter persons={persons} />
      <h3>Add a new</h3>
      <PersonForm
        handleAddName={handleAddName}
        handleAddPhone={handleAddPhone}
        handleSubmit={handleSubmit}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>
          <Persons person={person} />
          <button onClick={() => deletePerson(person.id)}>borrar</button>
        </div>
      ))}
    </div>
  );
};

export default App;

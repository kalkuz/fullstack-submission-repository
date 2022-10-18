/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import {
  getAll, create, update, del,
} from './Backend';

function Filter({ setQuery }) {
  return (
    <form>
      <div>
        filter shown with
        <input onChange={(e) => setQuery(e.target.value)} />
      </div>
    </form>
  );
}

function PersonForm({ setName, setNumber, onSubmit }) {
  return (
    <form>
      <div>
        name:
        {' '}
        <input onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        number:
        {' '}
        <input onChange={(e) => setNumber(e.target.value)} />
      </div>
      <div>
        <button type="button" onClick={onSubmit}>add</button>
      </div>
    </form>
  );
}

const Persons = ({
  persons, query, onDelete, setMessage,
}) => persons
  .filter((person) => person.name.toLowerCase().startsWith(query.toLowerCase())).map((person) => (
    <div key={`Person ${person.name}`}>
      {person.name}
      {' '}
      {person.number}
      <input
        type="button"
        value="Delete"
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this person?')) {
            del(person._id).then(() => {
              setMessage({ type: 'success', message: `Successfully deleted ${person.name}` });
              onDelete();
            }).catch(() => setMessage({ type: 'error', message: `An error has occurred while deleting ${person.name}` }));
          }
        }}
      />
    </div>
  ));

function Notification({ message }) {
  if (message === null) {
    return null;
  }

  return (
    <div className={message.type}>
      {message.message}
    </div>
  );
}

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [query, setQuery] = useState('');

  const [message, setMessage] = useState(null);

  const GetPersons = () => getAll().then(({ data }) => setPersons(data));
  const CreatePerson = (newObj) => create(newObj)
    .then(() => {
      setMessage({ type: 'success', message: `Added ${newObj.name}` });
      GetPersons();
    })
    .catch((err) => setMessage({ type: 'error', message: err.response.data.error }));

  const HandleSubmit = () => {
    const person = persons.find((p) => p.name === newName);
    if (person) {
      // alert(`${newName} is already added to the phonebook`);
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to update the number?`)) {
        update(person._id, { ...person, number: newNumber }).then(() => {
          GetPersons();
          setMessage({ type: 'success', message: `Updated ${person.name}` });
        })
          .catch(() => setMessage({ type: 'error', message: `Could not update ${person.name}` }));
        return;
      }
    }

    const newObj = { name: newName, number: newNumber };
    CreatePerson(newObj);
  };

  useEffect(() => {
    GetPersons();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter setQuery={setQuery} />

      <h3>Add a new...</h3>
      <PersonForm setName={setNewName} setNumber={setNewNumber} onSubmit={() => HandleSubmit()} />

      <h2>Numbers</h2>
      <Persons persons={persons} query={query} setMessage={setMessage} onDelete={() => GetPersons()} />
    </div>
  );
}

export default App;

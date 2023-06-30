import { nanoid } from 'nanoid';
import { Filter } from './Filter';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  addContact,
  changeFilter
} from 'redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();

  const {filter, contacts} = useSelector(state => state.state);

  const handleChange = event => {
    const payload = event.currentTarget.value;
    dispatch(changeFilter(payload));
  };

  const handleDelete = event => {
    const payload = event.currentTarget.id;
    dispatch(deleteContact(payload));
  };

  const handleAddContact = values => {
    const { name, number } = values;
    const payload = { id: nanoid(), name, number };

    if (
      contacts
        .map(contact => contact.name)
        .some(
          collectionName => collectionName.toLowerCase() === name.toLowerCase()
        )
    ) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContact(payload));
  };

  const renderContacts = () => {
    if (filter === '') {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>
        <h1 style={{ textAlign: 'center' }}>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />

        <h2 style={{ textAlign: 'center' }}>Contacts</h2>
        <Filter filter={filter} onChange={handleChange} />
        <ContactList contacts={renderContacts()} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;

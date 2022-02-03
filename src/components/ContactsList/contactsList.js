import { ContactsListItem } from './contactsListItem';
import css from '../../styles/contacts.module.css';
import { useSelector, useDispatch } from 'react-redux';
import * as operations from '../../store/items/operations';
import { useEffect } from 'react';
import { LoaderSpinner } from '../Loader';

const ContactsList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state =>
    getVisibleContacts(state.contacts.items, state.contacts.filter),
  );
  const loading = useSelector(state => state.contacts.loading);

  useEffect(() => {
    dispatch(operations.fetchContacts());
  }, []);

  function getVisibleContacts(allContacts, filter) {
    const normalizedFilter = filter.toLowerCase();

    return allContacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }

  return (
    <>
      {loading && <LoaderSpinner />}
      {contacts.length === 0 && loading === false && <p>Nothing was founded</p>}
      <ul className={css.list}>
        {contacts?.map(contact => (
          <ContactsListItem
            key={contact.id}
            name={contact.name}
            number={contact.phone}
            deletFunc={() => dispatch(operations.deleteContact(contact.id))}
          />
        ))}
      </ul>
    </>
  );
};

export default ContactsList;

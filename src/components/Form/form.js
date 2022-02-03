import { useState } from 'react';
import css from '../../styles/form.module.css';
import * as operations from '../../store/items/operations';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;

      default:
        break;
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
    newContact({ name, phone });
    reset();
  };

  function newContact(data) {
    contacts.some(contact => contact.name === data.name)
      ? alert(`${data.name} is already in contacts`)
      : dispatch(operations.postContact(data));
  }

  function reset() {
    setName('');
    setPhone('');
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.container}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            onChange={handleChange}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.label}>
          Number
          <input
            className={css.input}
            onChange={handleChange}
            value={phone}
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Form;

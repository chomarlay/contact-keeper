import React, { useState, useContext, useEffect } from 'react';
import ContactContext from './../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    // load the current contact details in a form
    if (current != null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'Personal'
      });
    }
  }, [contactContext, current]); // this is required, we only want to have this if the contactContext is changed or the current value is change,
  //else will cause indefinite loop to load the form

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Personal'
  });

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='Personal'
        checked={type === 'Personal'}
        onChange={onChange}
      />
      Personal{'  '}
      <input
        type='radio'
        name='type'
        value='Professional'
        checked={type === 'Professional'}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      <div>
        {current && (
          <input
            type='button'
            value='Clear'
            className='btn btn-light btn-block'
            onClick={clearAll}
          />
        )}
      </div>
    </form>
  );
};

export default ContactForm;

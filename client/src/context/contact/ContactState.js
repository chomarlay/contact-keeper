import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactReducer from './contactReducer';
import ContactContext from './contactContext';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    current: null,
    contacts: [
      {
        id: 1,
        name: 'Micky Mouse',
        email: 'MickyM@gmail.com',
        phone: '111-111-1111',
        type: 'Personal'
      },
      {
        id: 2,
        name: 'Daisy Duck',
        email: 'DaisyD@gmail.com',
        phone: '222-222-2222',
        type: 'Personal'
      },
      {
        id: 3,
        name: 'Minnie Mouse',
        email: 'MinnieM@gmail.com',
        phone: '333-333-3333',
        type: 'Personal'
      },
      {
        id: 4,
        name: 'Donald Duck',
        email: 'DonaldD@gmail.com',
        phone: '444-444-444',
        type: 'Professional'
      }
    ]
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: 'ADD_CONTACT', payload: contact });
  };

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };
  // Update Contact

  // Set Current
  const setCurrent = contact => {
    dispatch({ type: 'SET_CURRENT', payload: contact });
  };

  // Clear Current
  const clearCurrent = contact => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };
  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

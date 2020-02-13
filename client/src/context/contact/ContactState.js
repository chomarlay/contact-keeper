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

  // Update Contact

  // Set Current

  // Clear Current

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

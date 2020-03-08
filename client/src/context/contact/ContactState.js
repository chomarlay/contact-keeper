import React, { useReducer } from 'react';
import ContactReducer from './contactReducer';
import ContactContext from './contactContext';
import axios from 'axios';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

const ContactState = props => {
  const initialState = {
    current: null,
    filtered: null,
    contacts: [],
    error: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/contacts', contact, config); // calling server side --- user.js post
      dispatch({ type: 'ADD_CONTACT', payload: res.data });
    } catch (error) {
      dispatch({ type: 'CONTACT_ERROR', payload: error.response.data.msg });
    }
  };

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };
  // Update Contact
  const updateContact = contact => {
    dispatch({ type: 'UPDATE_CONTACT', payload: contact });
  };
  // Set Current
  const setCurrent = contact => {
    dispatch({ type: 'SET_CURRENT', payload: contact });
  };

  // Clear Current
  const clearCurrent = contact => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };
  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: 'FILTER_CONTACTS', payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

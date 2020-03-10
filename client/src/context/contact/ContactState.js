import React, { useReducer } from 'react';
import ContactReducer from './contactReducer';
import ContactContext from './contactContext';
import axios from 'axios';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
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

  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: 'GET_CONTACTS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'CONTACT_ERROR', payload: error.response.data.msg });
    }
  };
  // Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/contacts', contact, config); // calling server side --- contacts.js post
      dispatch({ type: 'ADD_CONTACT', payload: res.data });
    } catch (error) {
      dispatch({ type: 'CONTACT_ERROR', payload: error.response.data.msg });
    }
  };

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
      dispatch({ type: 'CONTACT_ERROR', payload: error.response.data.msg });
    }
  };
  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: 'CLEAR_CONTACTS' });
  };

  // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      ); // calling server side --- contacts.js
      dispatch({ type: 'UPDATE_CONTACT', payload: res.data });
    } catch (error) {
      dispatch({ type: 'CONTACT_ERROR', payload: error.response.data.msg });
    }
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
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please enter contacts</h4>;
  }

  return (
    <Fragment>
      {contacts !== null ? (
        <div>
          {filtered !== null && !loading
            ? filtered.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;

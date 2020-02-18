import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef('');

  useEffect(() => {
    console.log('useEffect ', text.current.value);
    if (filtered === null) {
      console.log('useEffect ', text.current.value);
      text.current.value = '';
    }
  });

  const onChange = e => {
    console.log(text.current.value);
    if (text.current.value !== '') {
      console.log('Filter contact ', e.target.value);
      filterContacts(e.target.value);
    } else {
      console.log('Clear Filter contact ', e.target.value);
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter contacts  '
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;

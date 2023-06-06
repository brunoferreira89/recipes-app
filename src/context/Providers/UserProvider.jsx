import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import userContext from '../Contexts/userContext';

function UserProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const isValidPassword = (password) => {
    const minLenght = 7;
    return password.length >= minLenght;
  };

  const value = useMemo(() => ({ user, setUser, isValidEmail, isValidPassword }), [user]);

  return (
    <userContext.Provider value={ value }>
      { children }
    </userContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;

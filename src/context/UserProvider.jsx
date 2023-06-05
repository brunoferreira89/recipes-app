import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import userContext from './userContext';

function UserProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const value = useMemo(() => ({ user, setUser }), [user]);

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

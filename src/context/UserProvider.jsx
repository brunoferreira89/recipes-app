import PropTypes from 'prop-types';
import React from 'react';
import userContext from './userContext';

function UserProvider({ children }) {
  return (
    <userContext.Provider value="">
      { children }
    </userContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;

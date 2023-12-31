import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import headerContext from '../Contexts/headerContext';

function HeaderProvider({ children }) {
  const [pageUrl, setPageUrl] = useState('');

  const value = useMemo(
    () => ({ pageUrl, setPageUrl }),
    [pageUrl, setPageUrl],
  );

  return (
    <headerContext.Provider value={ value }>
      { children }
    </headerContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;

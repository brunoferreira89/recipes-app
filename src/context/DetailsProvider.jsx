import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import detailsContext from './detailsContext';

function DetailsProvider({ children }) {
  const [data, setData] = useState(null);

  const value = useMemo(() => ({ data, setData }), [data, setData]);

  return (
    <detailsContext.Provider value={ value }>
      {children}
    </detailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsProvider;

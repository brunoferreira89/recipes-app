import PropTypes from 'prop-types';
import React from 'react';

function Button({ dataTestid, className = '', onClick, textContent }) {
  return (
    <button
      data-testid={ dataTestid }
      className={ className }
      onClick={ onClick }
    >
      { textContent }
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.any,
  dataTestid: PropTypes.any,
  onClick: PropTypes.any,
  textContent: PropTypes.any,
}.isRequired;

export default Button;

import PropTypes from 'prop-types';
import React from 'react';

function Button({
  dataTestid, className = '', onClick, textContent,
}) {
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
  className: PropTypes.string,
  dataTestid: PropTypes.string,
  onClick: PropTypes.func,
  textContent: PropTypes.string,
}.isRequired;

export default Button;

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './styles/BtnInstructionsShow.module.css';

function BtnInstructionsShow({ objectPath }) {
  const [isVisibleInstruction, setIsVisibleInstruction] = useState(false);

  return (
    <div>
      <button
        className={
          isVisibleInstruction ? styles.instructionsBtnActive : (
            styles.instructionsBtnInactive)
        }
        onClick={ () => setIsVisibleInstruction((state) => !state) }
      >
        Instructions
      </button>
      <p
        data-testid="instructions"
        className={
          isVisibleInstruction ? (
            styles.instructionsResponseActive
          ) : styles.instructionsResponseInactive
        }
      >
        { objectPath.strInstructions }
      </p>
    </div>
  );
}

BtnInstructionsShow.propTypes = {
  objectPath: PropTypes.shape({
    strInstructions: PropTypes.string,
  }).isRequired,
};

export default BtnInstructionsShow;

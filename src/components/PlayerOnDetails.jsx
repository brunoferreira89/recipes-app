import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Play } from '@phosphor-icons/react';
import styles from './styles/PlayerOnDetails.module.css';
import IframeYoutube from './IframeYoutube';

function PlayerOnDetails({ mealsOrDrinks, objectPath }) {
  const [isIframeVisible, setIsIframeVisible] = useState(false);

  return (
    <div>
      <button
        type="button"
        className={ styles.playContainer }
        onClick={ () => setIsIframeVisible((state) => !state) }
      >
        <div
          className={ styles.playContent }
        >
          <Play className={ styles.playIcon } size={ 32 } weight="fill" />
        </div>
      </button>
      <section
        className={
          isIframeVisible ? styles.iframeActive : styles.iframeInactive
        }
      >
        <button
          type="button"
          onClick={ () => setIsIframeVisible((state) => !state) }
          className={ styles.closeIframe }
        >
          X
        </button>
        <IframeYoutube
          mealsOrDrinks={ mealsOrDrinks }
          objectPath={ objectPath }
        />
      </section>
    </div>
  );
}

PlayerOnDetails.propTypes = {
  mealsOrDrinks: PropTypes.string.isRequired,
  objectPath: PropTypes.string.isRequired,
};

export default PlayerOnDetails;

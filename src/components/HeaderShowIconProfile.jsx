import PropTypes from 'prop-types';
import { UserCircle } from '@phosphor-icons/react';
import React from 'react';
import styles from './styles/HeaderShowIconProfile.module.css';

function HeaderShowIconProfile({ pageUrl }) {
  return (
    <UserCircle
      data-testid="profile-top-btn"
      size={ 38 }
      weight={ pageUrl === '/profile' ? 'fill' : 'regular' }
      className={ pageUrl === '/profile' && styles.userIconActive }
    />
  );
}

HeaderShowIconProfile.propTypes = {
  pageUrl: PropTypes.string.isRequired,
};

export default HeaderShowIconProfile;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  const getUserFromStorage = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    setUserEmail(email);
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  return (
    <div>
      <span data-testid="profile-email">{userEmail}</span>
      <div>
        <Button
          dataTestid="profile-done-btn"
          textContent="Done Recipes"
          onClick={ () => history.push('/done-recipes') }
        />
        <Button
          dataTestid="profile-favorite-btn"
          textContent="Favorite Recipes"
          onClick={ () => history.push('/favorite-recipes') }
        />
        <Button
          dataTestid="profile-logout-btn"
          textContent="Logout"
        />
      </div>
    </div>
  );
}

export default Profile;

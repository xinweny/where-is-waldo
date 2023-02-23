import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../firebase-config';

import RouteSwitch from './RouteSwitch';

function App() {
  const [admin, setAdmin] = useState(null);

  const handleSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAdmin(userCredential.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setAdmin(null);
        console.log('Sign out successful.');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="app">
      <RouteSwitch
        isAdmin={!!admin}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut}
      />
    </div>
  );
}

export default App;

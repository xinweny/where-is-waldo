import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../utils/firebase-config';

import RouteSwitch from './RouteSwitch';

function App() {
  const [admin, setAdmin] = useState(null);

  onAuthStateChanged(auth, (user) => { setAdmin(user || null); });

  const handleSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
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

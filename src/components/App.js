import React from 'react';

import Header from './Header';
import LevelSelect from '../pages/LevelSelect';
import Footer from './Footer';

function App() {
  return (
    <div className="app">
      <Header /> 
      <LevelSelect />     
      <Footer />
    </div>
  );
}

export default App;

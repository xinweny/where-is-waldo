import React from 'react';

import Header from './Header';
import LevelSelectPage from './LevelSelectPage';
import Footer from './Footer';

function App() {
  return (
    <div className="app">
      <Header /> 
      <main>
        <LevelSelectPage />
      </main>     
      <Footer />
    </div>
  );
}

export default App;

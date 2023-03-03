import React, { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../utils/firebase-config';
import { useFetchDocs } from '../utils/hooks';

import LevelCard from '../components/LevelCard';

function LevelSelectPage({ isAdmin }) {
  const [levels, setLevels] = useState([]);

  useFetchDocs(
    () => getDocs(collection(db, 'levels')),
    setLevels,
    [],
  );

  return (
    <main className="level-select-page">
      <div className="level-cards">
        {levels.map((level) => <LevelCard key={level.id} level={level} isAdmin={isAdmin} />)}
      </div>
    </main>
  );
}

export default LevelSelectPage;

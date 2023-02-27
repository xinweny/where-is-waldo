import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../utils/firebase-config';

import LevelCard from '../components/LevelCard';

function LevelSelectPage() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      if (levels.length === 0) {
        getDocs(collection(db, 'levels')).then((snapshot) => {
          const fLevels = [];

          snapshot.forEach((doc) => {
            fLevels.push({ id: doc.id, ...doc.data() });
          });

          setLevels(fLevels);
        });
      }
    };

    fetchLevels();

    return () => new AbortController().abort();
  }, []);

  return (
    <main className="level-select-page">
      <h2>Level Select</h2>
      <div className="level-cards">
        {levels.map((level) => <LevelCard key={level.id} level={level} />)}
      </div>
    </main>
  );
}

export default LevelSelectPage;

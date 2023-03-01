import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../utils/firebase-config';
import { useFetchDocs } from '../utils/hooks';

import ScoresTable from '../components/ScoresTable';

function LeaderboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [levels, setLevels] = useState([]);
  const [scores, setScores] = useState([]);
  const [level, setLevel] = useState(null);

  useFetchDocs(
    () => getDocs(collection(db, 'levels')),
    setLevels,
    [],
  );

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setLevel(levels.find((lvl) => lvl.id === id));
    } else {
      setLevel(levels[0]);
    }
  }, []);

  useFetchDocs(
    () => getDocs(collection(db, 'scores')),
    setScores,
    [level],
  );

  return (
    <main className="leaderboard-page">
      <nav>
        {levels.map((lvl) => (
          <button
            type="button"
            key={lvl.id}
            onClick={() => {
              setLevel(lvl);
              setSearchParams({ id: lvl.id });
            }}
          >
            {lvl.title}
          </button>
        ))}
      </nav>
      {(level) ? (
        <div>
          <Link to={`/levels/${level.id}`} state={{ level }}>
            <h2>{level.title}</h2>
          </Link>
          <ScoresTable scores={scores} level={level} />
        </div>
      ) : null}
    </main>
  );
}

export default LeaderboardPage;

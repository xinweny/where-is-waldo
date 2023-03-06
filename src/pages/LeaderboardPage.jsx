import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../utils/firebase-config';
import { useFetchDocs } from '../utils/hooks';

import ScoresTable from '../components/ScoresTable';

import '../styles/LeaderboardPage.css';

function LeaderboardPage({ isAdmin }) {
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
    if (levels.length > 0) {
      const id = searchParams.get('id');

      if (id) {
        setLevel(levels.find((lvl) => lvl.id === id));
      } else {
        setLevel(levels[0]);
        setSearchParams({ id: levels[0].id });
      }
    }
  }, [levels]);

  useFetchDocs(
    () => getDocs(query(collection(db, 'scores'), where('levelId', '==', level ? level.id : ''))),
    setScores,
    [level],
  );

  return (
    <main className="leaderboard-page">
      <nav>
        {(level) ? levels.map((lvl) => (
          <button
            className={`level-nav-btn ${(lvl.id === level.id) ? 'active' : ''}`}
            type="button"
            key={lvl.id}
            onClick={() => {
              setLevel(lvl);
              setSearchParams({ id: lvl.id });
            }}
          >
            {lvl.title}
          </button>
        )) : null}
      </nav>
      {(level) ? (
        <div className="leaderboard-content">
          <div className="background-img" style={{ backgroundImage: `url(${level.imgUrl})` }} />
          <Link to={`/levels/${level.id}`} state={{ level }}>
            <h2>{level.title}</h2>
          </Link>
          <ScoresTable
            scores={scores.sort((a, b) => a.ms - b.ms)}
            setScores={setScores}
            level={level}
            isAdmin={isAdmin}
          />
        </div>
      ) : null}
    </main>
  );
}

export default LeaderboardPage;

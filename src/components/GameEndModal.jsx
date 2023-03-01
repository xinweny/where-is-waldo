import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { db } from '../utils/firebase-config';
import { formatMs } from '../utils/helpers';

function GameEndModal({
  title,
  duration,
  handleRestart,
  levelId,
}) {
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const submitScore = async (e) => {
    e.preventDefault();

    if (name !== '') {
      await addDoc(collection(db, 'scores'), {
        levelId,
        name,
        ms: duration,
      });

      navigate(`/leaderboard/${levelId}`);
    }
  };

  return (
    <div className="game-end-modal">
      <h3>{title}</h3>
      <p>{`Congratulations! You found all targets in ${formatMs(duration)}.`}</p>
      <div>
        <label htmlFor="player-name">
          <p>Name</p>
          <input type="text" htmlFor="player-name" onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit" onClick={submitScore}>Add to Leaderboard</button>
      </div>
      <button type="button" onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default GameEndModal;

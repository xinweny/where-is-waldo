import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';

import { db } from '../utils/firebase-config';

import WarningModal from './WarningModal';

function ScoresTable({
  level,
  scores, setScores,
  isAdmin,
}) {
  if (scores.length === 0) {
    return (
      <div>
        <p>No high scores yet.</p>
        <Link to={`/levels/${level.id}`} state={{ level }}>Be the first!</Link>
      </div>
    );
  }

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);

  const deleteScore = async (e) => {
    e.preventDefault();

    await deleteDoc(doc(db, 'scores', selectedScore.id));

    setScores((prev) => prev.filter((s) => s.id !== selectedScore.id));
    setShowWarningModal(false);
  };

  return (
    <div>
      <table className="scores-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, i) => (
            <tr key={score.id}>
              <td>{i + 1}</td>
              <td>{score.name}</td>
              <td>{score.ms / 1000}</td>
              {(isAdmin) ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedScore(score);
                    setShowWarningModal(true);
                  }}
                >
                  x
                </button>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      {(showWarningModal) ? (
        <WarningModal
          header="Delete score"
          message={`Are you sure you want to delete ${selectedScore.name}'s score (${selectedScore.ms / 1000} seconds)?`}
          setShow={setShowWarningModal}
          action={deleteScore}
        />
      ) : null}
    </div>
  );
}

export default ScoresTable;

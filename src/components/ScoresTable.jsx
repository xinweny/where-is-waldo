import React from 'react';
import { Link } from 'react-router-dom';

function ScoresTable({ level, scores }) {
  if (scores.length === 0) {
    return (
      <div>
        <p>No high scores yet.</p>
        <Link to={`/levels/${level.id}`} state={{ level }}>Be the first!</Link>
      </div>
    );
  }

  return (
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
          <tr>
            <td>{i + 1}</td>
            <td>{score.name}</td>
            <td>{score.ms / 1000}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ScoresTable;

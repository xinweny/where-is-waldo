import React from 'react';
import { Link } from 'react-router-dom';

function LevelCard({ level, isAdmin }) {
  return (
    <div className="level-card">
      <img src={level.imgUrl} alt={level.title} />
      <Link to={`levels/${level.id}`} state={{ level }}>
        <div>
          <h3>{level.title}</h3>
          <p>{`Difficulty: ${level.difficulty}`}</p>
        </div>
      </Link>
      <div>
        {level.targets.map((target) => (
          <img
            key={target.id}
            src={target.imgUrl}
            alt={target.name}
          />
        ))}
      </div>
      {(isAdmin) ? (
        <Link to={`levels/${level.id}/edit`} state={{ level }}>
          <img src="#" alt="Edit level" />
        </Link>
      ) : null}
    </div>
  );
}

export default LevelCard;

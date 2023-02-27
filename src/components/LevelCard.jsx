import React from 'react';

function LevelCard({ level }) {
  return (
    <div className="level-card">
      <div>
        <h3>{level.title}</h3>
        <p>{`Difficulty: ${level.difficulty}`}</p>
      </div>
      <img src={level.imgUrl} alt={level.title} />
      <div>
        {level.targets.map((target) => (
          <img
            key={target.id}
            src={target.imgUrl}
            alt={target.name}
          />
        ))}
      </div>
    </div>
  );
}

export default LevelCard;

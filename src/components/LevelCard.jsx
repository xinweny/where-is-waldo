import React from 'react';
import { Link } from 'react-router-dom';

import editIcon from '../assets/edit.svg';
import { ReactComponent as StarSVG } from '../assets/star-fill.svg';

import '../styles/LevelCard.css';

function LevelCard({ level, isAdmin }) {
  return (
    <div className="level-card">
      <div className="img-container">
        <img src={level.imgUrl} alt={level.title} />
      </div>
      <div className="level-card-info">
        <Link to={`levels/${level.id}`} state={{ level }}>
          <div className="level-card-header">
            <h3>{level.title}</h3>
            <div className="stars">
              {[...Array(5).keys()].map((i) => (
                <StarSVG
                  key={i}
                  alt="Star"
                  fill={(i + 1) <= level.difficulty ? '#ffc800' : '#cfcfcf'}
                />
              ))}
            </div>
            {(isAdmin) ? (
              <Link className="edit-level-link" to={`levels/${level.id}/edit`} state={{ level, mode: 'edit' }}>
                <img src={editIcon} alt="Edit level" />
              </Link>
            ) : null}
          </div>
        </Link>
        <div className="target-cards">
          {level.targets.map((target) => (
            <div className="target-card">
              <img
                key={target.id}
                src={target.imgUrl}
                alt={target.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LevelCard;

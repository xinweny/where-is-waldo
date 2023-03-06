import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Filter from 'bad-words';

import { db } from '../utils/firebase-config';
import { formatMs } from '../utils/helpers';

function GameEndModal({
  title,
  duration,
  handleRestart,
  levelId,
}) {
  const [name, setName] = useState('');
  const [validationMsg, setValidationMsg] = useState('');

  const inputNameRef = useRef();
  const navigate = useNavigate();
  const filter = new Filter({ placeHolder: '*' });

  useEffect(() => {
    if (name !== '') {
      if (!(/[A-Za-z0-9]+/.test(name))) setValidationMsg('Name must contain only alphanumerical characters.');
    } else {
      setValidationMsg('');
    }
  }, [name]);

  const submitScore = async (e) => {
    e.preventDefault();

    const inputEl = inputNameRef.current;

    if (inputEl.checkValidity()) {
      const fName = filter.clean(name);

      if (fName.includes('*')) {
        setValidationMsg('No profanity allowed.');
      } else {
        await addDoc(collection(db, 'scores'), {
          levelId,
          name: fName,
          ms: duration,
          createdAt: Timestamp.now(),
        });

        navigate(`/leaderboard?id=${levelId}`);
      }
    } else {
      setValidationMsg('Name is required.');
    }
  };

  return (
    <div className="modal game-end-modal">
      <h3>{title}</h3>
      <p>{`Congratulations! You found all targets in ${formatMs(duration)}.`}</p>
      <div>
        <label htmlFor="player-name">
          <p>Name</p>
          <p className="validation-msg">{validationMsg}</p>
          <input
            ref={inputNameRef}
            type="text"
            htmlFor="player-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            pattern="[A-Za-z0-9]+"
            maxLength="36"
            required
          />
        </label>
        <button type="submit" onClick={submitScore}>Add to Leaderboard</button>
      </div>
      <button type="button" onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default GameEndModal;

import React, { useRef } from 'react';

import ImageInput from './ImageInput';
import { ReactComponent as ImgUploadSVG } from '../assets/image-upload.svg';

import '../styles/LevelForm.css';

function LevelForm({
  title, setTitle,
  difficulty, setDifficulty,
  description, setDescription,
  setImgFile,
}) {
  return (
    <form className="level-form">
      <section>
        <label htmlFor="level-title">
          <p>Title</p>
          <input
            type="text"
            id="level-title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <div>
          <label htmlFor="level-difficulty" className="level-difficulty">
            <p>Difficulty</p>
            <div>
              <input
                type="range"
                id="level-difficulty"
                min="1"
                max="5"
                step="1"
                value={difficulty}
                required
                onChange={(e) => {
                  setDifficulty(Number(e.target.value));
                }}
              />
              <p>{difficulty}</p>
            </div>
          </label>
          <ImageInput id="level-image" ref={useRef()} setImgFile={setImgFile} SVGComponent={ImgUploadSVG} />
        </div>
      </section>
      <label htmlFor="level-description" className="level-description">
        <p>Description</p>
        <textarea
          name="level-description"
          id="level-description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </label>
    </form>
  );
}

export default LevelForm;

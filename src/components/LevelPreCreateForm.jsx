import React from 'react';

function LevelPreCreateForm({
  setTitle,
  difficulty,
  setDifficulty,
  setImgFile,
}) {
  return (
    <form>
      <label htmlFor="level-title">
        Title
        <input
          type="text"
          id="level-title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor="level-difficulty">
        Difficulty
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
      </label>
      <label htmlFor="level-image">
        Image
        <input
          type="file"
          id="level-image"
          accept="image/*"
          multiple={false}
          required
          onChange={(e) => setImgFile(e.target.files[0])}
        />
      </label>
    </form>
  );
}

export default LevelPreCreateForm;

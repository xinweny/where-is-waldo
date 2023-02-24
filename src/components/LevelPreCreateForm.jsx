import React from 'react';

function LevelPreCreateForm({ handleChange }) {
  return (
    <form>
      <label htmlFor="level-title">
        Title
        <input type="text" id="level-title" required />
      </label>
      <label htmlFor="level-image">
        Image
        <input
          type="file"
          id="level-image"
          accept="image/*"
          multiple={false}
          required
          onChange={(e) => handleChange(e.target.files[0])}
        />
      </label>
    </form>
  );
}

export default LevelPreCreateForm;

import React, { useState, useEffect } from 'react';

import LevelImagePreview from '../components/LevelImagePreview';

function CreateLevelPage() {
  const [imgFile, setImgFile] = useState(undefined);
  const [preview, setPreview] = useState(undefined);

  useEffect(() => {
    if (!imgFile) {
      setPreview(undefined);
      return () => {};
    }

    const imgUrl = URL.createObjectURL(imgFile);
    setPreview(imgUrl);

    return () => URL.revokeObjectURL(imgUrl);
  }, [imgFile]);

  return (
    <main className="create-level-page">
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
            onChange={(e) => setImgFile(e.target.files[0])}
          />
        </label>
      </form>
      {preview ? <LevelImagePreview imgUrl={preview} /> : null}
    </main>
  );
}

export default CreateLevelPage;

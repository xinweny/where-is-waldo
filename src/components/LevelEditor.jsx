import React, { useState } from 'react';

import TargetForm from './TargetForm';
import TargetPreviewCard from './TargetPreviewCard';
import ZoomInput from './ZoomInput';
import LevelImagePreview from './LevelImagePreview';
import TargetSelectBox from './TargetSelectBox';

import '../styles/LevelEditor.css';

function LevelEditor({
  imgUrl,
  targets,
  setTargets,
  levelId,
}) {
  const [size, setSize] = useState([0, 0]);
  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState([0, 0]);
  const [scale, setScale] = useState(1);
  const [selectColor, setSelectColor] = useState('#000000');

  return (
    <div className="level-editor">
      <div className="level-editor-panel">
        <TargetForm
          xRange={[start[0], end[0]].sort((a, b) => a - b)}
          yRange={[start[1], end[1]].sort((a, b) => a - b)}
          setTargets={setTargets}
          levelId={levelId}
          setStartPos={setStart}
          setEndPos={setEnd}
        />
        <div className="target-preview-cards">
          {(targets.length > 0) ? targets.map((target) => (
            <TargetPreviewCard
              key={target.id}
              target={target}
              setTargets={setTargets}
            />
          )) : <p>No targets to show.</p>}
        </div>
        <div className="img-preview-settings">
          <ZoomInput scale={scale} setScale={setScale} />
          <input
            type="color"
            name="select-color"
            id="select-color"
            value={selectColor}
            onChange={(e) => setSelectColor(e.target.value)}
          />
        </div>
      </div>
      <LevelImagePreview
        imgUrl={imgUrl}
        size={size}
        scale={scale}
        start={start}
        end={end}
        set={{
          size: (val) => setSize(val),
          scale: (val) => setScale(val),
          start: (val) => setStart(val),
          end: (val) => setEnd(val),
        }}
      >
        {targets.map((target) => (
          <TargetSelectBox
            key={target.id}
            start={[target.xRange[0], target.yRange[0]]}
            end={[target.xRange[1], target.yRange[1]]}
            scale={scale}
            imgSize={size}
            name={target.name}
            color={selectColor}
          />
        ))}
        <TargetSelectBox
          start={start}
          end={end}
          scale={scale}
          color={selectColor}
          imgSize={size}
        />
      </LevelImagePreview>
    </div>
  );
}

export default LevelEditor;

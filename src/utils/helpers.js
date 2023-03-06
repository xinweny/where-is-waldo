export const unscalePos = (pos, scale) => pos.map((p) => p / scale);

export const scalePos = (pos, scale) => pos.map((p) => p * scale);

export const convertRelativePos = (e) => {
  const offset = e.target.getBoundingClientRect();

  const newPos = [
    e.clientX - offset.left,
    e.clientY - offset.top,
  ];

  return newPos;
};

export const styleSelectBox = (start, end, scale, imgSize, color) => {
  const size = [
    (Math.abs(end[0] - start[0])) * scale,
    (Math.abs(end[1] - start[1])) * scale,
  ];

  const style = {
    width: `${size[0]}px`,
    height: `${size[1]}px`,
    border: size.every((dim) => dim !== 0) ? `2px solid ${color}` : 'none',
    color,
  };

  if (end[0] > start[0]) {
    style.left = `${start[0] * scale}px`;
  } else {
    style.right = `${(imgSize[0] - start[0]) * scale}px`;
  }

  if (end[1] > start[1]) {
    style.top = `${start[1] * scale}px`;
  } else {
    style.bottom = `${(imgSize[1] - start[1]) * scale}px`;
  }

  return style;
};

export const formatMs = (ms) => {
  if (!ms) return '00:00:0';

  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms / 1000) % 60);
  const millisec = Math.floor(ms % 1000).toString(10)[0];

  return `${(min < 10) ? '0' : ''}${min}:${(sec < 10) ? '0' : ''}${sec}:${millisec}`;
};

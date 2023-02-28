export const unscalePos = (pos, scale) => pos.map((p, i) => p / scale[i]);

export const scalePos = (ref, scale) => ref.current.map((p, i) => p * scale[i]);

export const convertRelativePos = (e) => {
  const offset = e.target.getBoundingClientRect();

  const newPos = [
    e.clientX - offset.left,
    e.clientY - offset.top,
  ];

  return newPos;
};

export const styleSelectBox = (start, end, scale, originalSize) => {
  const size = [
    (Math.abs(end[0] - start[0])) * scale[0],
    (Math.abs(end[1] - start[1])) * scale[1],
  ];

  const style = {
    width: `${size[0]}px`,
    height: `${size[1]}px`,
    border: size.every((dim) => dim !== 0) ? '1px solid black' : 'none',
  };

  if (end[0] > start[0]) {
    style.left = `${start[0] * scale[0]}px`;
  } else {
    style.right = `${(originalSize[0] - start[0]) * scale[0]}px`;
  }

  if (end[1] > start[1]) {
    style.top = `${start[1] * scale[1]}px`;
  } else {
    style.bottom = `${(originalSize[1] - start[1]) * scale[1]}px`;
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

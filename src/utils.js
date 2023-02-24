export const unscalePos = (pos, scale) => pos.map((p, i) => p / scale[i]);

export const scalePos = (ref, scale) => ref.current.map((p, i) => p * scale[i]);

export const convertRelativePos = (e, setter) => {
  const offset = e.target.getBoundingClientRect();

  const newPos = [
    e.clientX - offset.left,
    e.clientY - offset.top,
  ];

  setter(newPos);
};

export const styleSelectBox = (start, end, sc, originalSizeRef) => {
  const size = [
    (Math.abs(end[0] - start[0])) * sc[0],
    (Math.abs(end[1] - start[1])) * sc[1],
  ];

  const style = {
    width: `${size[0]}px`,
    height: `${size[1]}px`,
    border: size.every((dim) => dim !== 0) ? '1px solid black' : 'none',
  };

  if (end[0] > start[0]) {
    style.left = `${start[0]}px`;
  } else {
    style.right = `${(originalSizeRef.current[0] * sc[0]) - start[0]}px`;
  }

  if (end[1] > start[1]) {
    style.top = `${start[1]}px`;
  } else {
    style.bottom = `${(originalSizeRef.current[1] * sc[1]) - start[1]}px`;
  }

  return style;
};

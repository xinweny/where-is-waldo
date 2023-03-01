import React from 'react';

function WarningModal({
  message,
  header,
  action,
  setShow,
}) {
  return (
    <div className="warning-modal">
      <h3>{header}</h3>
      <p>{message}</p>
      <div>
        <button type="button" className="yes-btn" onClick={action}>Yes</button>
        <button type="button" className="no-btn" onClick={() => setShow(false)}>No</button>
      </div>
    </div>
  );
}

export default WarningModal;

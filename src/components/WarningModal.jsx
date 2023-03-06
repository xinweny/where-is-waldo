import React from 'react';

import '../styles/WarningModal.css';

function WarningModal({
  message,
  header,
  action,
  setShow,
}) {
  return (
    <div className="modal warning-modal">
      <h3>{header}</h3>
      <p>{message}</p>
      <div className="confirmation-btns">
        <button type="button" className="yes-btn" onClick={action}>Yes</button>
        <button type="button" className="no-btn" onClick={() => setShow(false)}>No</button>
      </div>
    </div>
  );
}

export default WarningModal;

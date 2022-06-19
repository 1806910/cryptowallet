import React from "react";
import "./styles.css";

function Modal({ setIsOpen }) {
  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="modal-close-button">
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        <div className="modal-form">
          <div className="modal-input1">
            <input placeholder="Quantity" />
          </div>
          <div className="modal-input2">
            <input placeholder="Buy price" />
          </div>
          <div className="modal-submit-button">
              <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import React from 'react';
import './ConfirmModal.scss';

const ConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal animate-modal">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this product?</p>
        <div className="modal-buttons">
          <button className="cancel-button animate-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-button animate-button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

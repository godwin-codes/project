import React from 'react';

export default function DeleteConfirm({ show, onCancel, onConfirm, itemName='item' }) {
  if (!show) return null;
  return (
    <div className="modal-backdrop-custom">
      <div className="card modal-custom p-3 card-custom">
        <h5>Confirm delete</h5>
        <p>Are you sure you want to delete <strong>{itemName}</strong>?</p>
        <div className="text-end">
          <button className="btn btn-secondary me-2" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

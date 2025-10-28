import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function EditBookModal({ book, onClose, onSaved }) {
  const [form, setForm] = useState(book || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => setForm(book || {}), [book]);

  if (!book) return null;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock), publishedYear: form.publishedYear ? Number(form.publishedYear) : undefined };
      const { data } = await api.put(`/books/${book._id}`, payload);
      onSaved(data);
      onClose();
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to save');
    } finally { setLoading(false); }
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="card modal-custom p-3 card-custom">
        <div className="d-flex justify-content-between mb-2">
          <h5>Edit book</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>Close</button>
        </div>

        <div className="row g-2">
          <div className="col-md-6"><input name="title" value={form.title || ''} onChange={handleChange} className="form-control" /></div>
          <div className="col-md-6"><input name="author" value={form.author || ''} onChange={handleChange} className="form-control" /></div>
          <div className="col-md-4"><input name="genre" value={form.genre || ''} onChange={handleChange} className="form-control" /></div>
          <div className="col-md-2"><input name="price" type="number" step="0.01" value={form.price || 0} onChange={handleChange} className="form-control" /></div>
          <div className="col-md-2"><input name="stock" type="number" value={form.stock || 0} onChange={handleChange} className="form-control" /></div>
          <div className="col-md-4"><input name="publishedYear" type="number" value={form.publishedYear || ''} onChange={handleChange} className="form-control" /></div>
        </div>

        <div className="text-end mt-3">
          <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}

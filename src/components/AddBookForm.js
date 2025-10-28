import React, { useState } from 'react';
import api from '../services/api';

export default function AddBookForm({ onAdded }) {
  const [form, setForm] = useState({ title: '', author: '', genre: '', price: '', stock: 0, publishedYear: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock), publishedYear: form.publishedYear ? Number(form.publishedYear) : undefined };
      const { data } = await api.post('/books', payload);
      setForm({ title: '', author: '', genre: '', price: '', stock: 0, publishedYear: '' });
      onAdded(data);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Failed to add book');
    } finally { setLoading(false); }
  };

  return (
    <div className="card p-3 card-custom mb-3">
      <h5>Add new book</h5>
      <form onSubmit={handleSubmit} className="row g-2">
        <div className="col-md-6">
          <input required name="title" value={form.title} onChange={handleChange} placeholder="Title" className="form-control" />
        </div>
        <div className="col-md-6">
          <input required name="author" value={form.author} onChange={handleChange} placeholder="Author" className="form-control" />
        </div>
        <div className="col-md-4">
          <input required name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" className="form-control" />
        </div>
        <div className="col-md-2">
          <input required name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Price" className="form-control" />
        </div>
        <div className="col-md-2">
          <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="form-control" />
        </div>
        <div className="col-md-4">
          <input name="publishedYear" type="number" value={form.publishedYear} onChange={handleChange} placeholder="Published Year" className="form-control" />
        </div>
        <div className="col-12 text-end">
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Book'}</button>
        </div>
      </form>
    </div>
  );
}

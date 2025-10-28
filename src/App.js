import React, { useEffect, useState } from 'react';
import api from './services/api';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import EditBookModal from './components/EditBookModal';
import DeleteConfirm from './components/DeleteConfirm';

function App(){
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [filter, setFilter] = useState({ q: '', author: '', genre: '' });
  const [dark, setDark] = useState(false);

  const fetchBooks = async (params = {}) => {
    const { data } = await api.get('/books', { params });
    setBooks(data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleAdded = (book) => setBooks(prev => [book, ...prev]);

  const handleSaved = (book) => setBooks(prev => prev.map(b => b._id === book._id ? book : b));

  const handleDelete = async (book) => {
    try {
      await api.delete(`/books/${book._id}`);
      setBooks(prev => prev.filter(b => b._id !== book._id));
      setDeleting(null);
    } catch (err) { alert(err?.response?.data?.error || 'Failed to delete'); }
  };

  const search = async (e) => {
    e.preventDefault();
    await fetchBooks(filter.q ? { q: filter.q } : { author: filter.author, genre: filter.genre });
  };

  const totalCount = books.length;
  const outOfStock = books.filter(b => !b.stock || b.stock <= 0).length;

  useEffect(() => { document.body.classList.toggle('dark', dark); }, [dark]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Book Inventory</h3>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => setDark(d => !d)}>{dark ? 'Light' : 'Dark'} Mode</button>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-4">
          <AddBookForm onAdded={handleAdded} />

          <div className="card p-3 card-custom">
            <h6>Search / Filter</h6>
            <form onSubmit={search} className="row g-2">
              <div className="col-12"><input className="form-control" placeholder="Free text search" value={filter.q} onChange={e=>setFilter(f=>({...f,q:e.target.value}))} /></div>
              <div className="col-6"><input className="form-control" placeholder="Author" value={filter.author} onChange={e=>setFilter(f=>({...f,author:e.target.value}))} /></div>
              <div className="col-6"><input className="form-control" placeholder="Genre" value={filter.genre} onChange={e=>setFilter(f=>({...f,genre:e.target.value}))} /></div>
              <div className="col-12 text-end"><button className="btn btn-sm btn-primary" type="submit">Apply</button></div>
            </form>
          </div>

          <div className="card p-3 mt-3 card-custom">
            <div>Total books: <strong>{totalCount}</strong></div>
            <div>Out of stock: <strong>{outOfStock}</strong></div>
          </div>
        </div>

        <div className="col-lg-8">
          <BookList books={books} onEdit={b=>setEditing(b)} onDelete={b=>setDeleting(b)} />
        </div>
      </div>

      {editing && <EditBookModal book={editing} onClose={()=>setEditing(null)} onSaved={handleSaved} />}
      <DeleteConfirm show={!!deleting} onCancel={()=>setDeleting(null)} onConfirm={()=>handleDelete(deleting)} itemName={deleting?.title} />
    </div>
  );
}

export default App;

import React from 'react';

export default function BookList({ books, onEdit, onDelete }) {
  return (
    <div className="card card-custom p-3">
      <h5 className="mb-2">Books</h5>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Year</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 && (
              <tr><td colSpan={7} className="text-center">No books found</td></tr>
            )}
            {books.map(b => (
              <tr key={b._id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.genre}</td>
                <td>${Number(b.price).toFixed(2)}</td>
                <td>{b.stock}</td>
                <td>{b.publishedYear || '-'}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(b)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(b)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

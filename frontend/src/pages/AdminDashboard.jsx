import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus, Pencil, X } from 'lucide-react';

const AdminDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '', category: '' });

  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/products', { headers });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ name: '', price: '', description: '', image: '', category: '' });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:5000/api/admin/products/${editingId}`
      : 'http://localhost:5000/api/admin/products';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ ...form, price: parseFloat(form.price) })
      });
      if (res.ok) {
        resetForm();
        fetchProducts();
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`http://localhost:5000/api/admin/products/${id}`, { method: 'DELETE', headers });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      category: product.category
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>🚫 Access Denied</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>You need Admin privileges to view this page.</p>
      </div>
    );
  }

  const inputStyle = { width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'white', fontFamily: 'Outfit' };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>🛠️ Admin Dashboard</h2>
        <button className="btn-primary" style={{ width: 'auto', padding: '0.7rem 1.5rem' }} onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Product</>}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Product Name</label>
              <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Price ($)</label>
              <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
              <input name="category" value={form.category} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} required style={inputStyle} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn-primary" style={{ maxWidth: '300px' }}>
                {editingId ? '✏️ Update Product' : '➕ Add Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <div className="loading"><div className="spinner"></div></div>
      ) : (
        <div style={{ background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Image</th>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Price</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.8rem' }}>
                    <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                  </td>
                  <td style={{ padding: '0.8rem' }}>{product.name}</td>
                  <td style={{ padding: '0.8rem', color: 'var(--primary-color)' }}>{product.category}</td>
                  <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>${product.price.toFixed(2)}</td>
                  <td style={{ padding: '0.8rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="icon-btn" style={{ color: '#60a5fa' }} onClick={() => handleEdit(product)}>
                        <Pencil size={18} />
                      </button>
                      <button className="icon-btn" style={{ color: '#ef4444' }} onClick={() => handleDelete(product._id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

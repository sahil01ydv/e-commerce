import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Package } from 'lucide-react';

const MyOrders = () => {
  const { token, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch('http://localhost:5000/api/orders/my-orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { setOrders(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [token]);

  if (!user) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Please login to view your orders</h2>
      </div>
    );
  }

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  if (orders.length === 0) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem' }}>
        <Package size={60} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
        <h2>No orders yet</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Start shopping and your orders will show up here.</p>
      </div>
    );
  }

  const statusColor = {
    'Processing': '#f59e0b',
    'Shipped': '#3b82f6',
    'Delivered': '#22c55e',
    'Cancelled': '#ef4444'
  };

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '2rem' }}>My Orders</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {orders.map(order => (
          <div key={order._id} style={{ background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Order ID: {order._id.slice(-8).toUpperCase()}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <span style={{ background: statusColor[order.status] + '20', color: statusColor[order.status], padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: '600', fontSize: '0.85rem' }}>
                {order.status}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-color)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div>
                    <p style={{ fontSize: '0.85rem' }}>{item.name}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>x{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>💳 {order.paymentMethod}</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;

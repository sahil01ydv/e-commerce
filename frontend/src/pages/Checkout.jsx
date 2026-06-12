import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const { removeFromCart } = useContext(CartContext);

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Please login first to place an order.');
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            product: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity
          })),
          shippingAddress: form,
          totalAmount: cartTotal
        })
      });
      if (res.ok) {
        // Clear cart
        cart.forEach(item => removeFromCart(item._id));
        setOrderPlaced(true);
      } else {
        const data = await res.json();
        alert(data.message || 'Error placing order');
      }
    } catch (err) {
      console.error(err);
      alert('Error placing order');
    }
    setLoading(false);
  };

  if (orderPlaced) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <CheckCircle size={80} color="#22c55e" style={{ marginBottom: '1.5rem' }} />
        <h1 style={{ marginBottom: '1rem' }}>Order Placed Successfully! 🎉</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Your order has been confirmed. Thank you for shopping with E-Shop!<br />Payment will be collected on delivery (COD).
        </p>
        <button className="btn-primary" style={{ maxWidth: '300px', margin: '0 auto' }} onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Your cart is empty</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Add some products first before checking out.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '2rem' }}>Checkout</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        {/* Shipping Form */}
        <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Shipping Details</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'white', fontFamily: 'Outfit' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} required rows={3}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'white', fontFamily: 'Outfit', resize: 'vertical' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>City</label>
              <input name="city" value={form.city} onChange={handleChange} required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'white', fontFamily: 'Outfit' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'white', fontFamily: 'Outfit' }} />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }} disabled={loading}>
              {loading ? 'Placing Order...' : '💳 Place Order (Cash on Delivery)'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
          {cart.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <p style={{ fontSize: '0.9rem' }}>{item.name}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Qty: {item.quantity}</p>
              </div>
              <span style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid var(--primary-color)' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

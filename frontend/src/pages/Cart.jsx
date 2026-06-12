import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Your cart is empty</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Looks like you haven't added anything yet.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2>Shopping Cart</h2>
      <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem', gridTemplateColumns: '2fr 1fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map(item => (
            <div key={item._id} style={{ display: 'flex', gap: '1rem', background: 'var(--surface-color)', padding: '1rem', borderRadius: '12px', alignItems: 'center', border: '1px solid var(--border-color)' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p style={{ color: 'var(--primary-color)' }}>${item.price.toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button className="icon-btn" onClick={() => updateQuantity(item._id, -1)}><Minus size={16} /></button>
                <span>{item.quantity}</span>
                <button className="icon-btn" onClick={() => updateQuantity(item._id, 1)}><Plus size={16} /></button>
              </div>
              <button className="icon-btn" style={{ color: '#ef4444' }} onClick={() => removeFromCart(item._id)}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '12px', height: 'fit-content', border: '1px solid var(--border-color)' }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1.5rem 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <span>Total</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn-primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

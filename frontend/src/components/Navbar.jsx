import { ShoppingBag, Search, User, LogOut, Shield, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <ShoppingBag className="text-primary" size={28} color="#8b5cf6" />
        <span>E-Shop</span>
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        {user && <Link to="/my-orders" className="nav-item">My Orders</Link>}
        {user && user.isAdmin && (
          <Link to="/admin" className="nav-item" style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Shield size={16} /> Admin
          </Link>
        )}
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Hi, {user.name}</span>
            <button className="icon-btn" onClick={logout} title="Logout">
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <Link to="/login" className="icon-btn" title="Login">
            <User size={20} />
          </Link>
        )}
        <Link to="/cart" className="icon-btn" style={{ position: 'relative' }}>
          <ShoppingBag size={20} />
          {cart.length > 0 && (
            <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--primary-color)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

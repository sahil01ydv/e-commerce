import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '4rem' }}><h2>Product not found</h2></div>;

  return (
    <div className="animate-fade-in">
      <button className="icon-btn" style={{ marginBottom: '2rem' }} onClick={() => navigate(-1)}>
        <ArrowLeft size={24} /> Back
      </button>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ color: 'var(--primary-color)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h1>
          <p className="text-secondary" style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            {product.description}
          </p>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            ${product.price.toFixed(2)}
          </div>
          <button className="btn-primary" style={{ padding: '1rem', fontSize: '1.2rem' }} onClick={() => addToCart(product)}>
            <ShoppingCart size={24} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

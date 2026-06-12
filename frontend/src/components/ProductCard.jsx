import { ShoppingCart } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="card-image" />
      </Link>
      <div className="card-content">
        <span className="card-category">{product.category}</span>
        <Link to={`/product/${product._id}`}>
          <h3 className="card-title">{product.name}</h3>
        </Link>
        <p className="card-desc">{product.description}</p>
        <div className="card-price">${product.price.toFixed(2)}</div>
        <button className="btn-primary" onClick={() => addToCart(product)}>
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

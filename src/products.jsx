import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './store/cartSlice';

const Products = () => {
  const dispatch = useDispatch();
  const products = [
    { id: 1, name: 'Product 1', price: 29.99, description: 'High quality product' },
    { id: 2, name: 'Product 2', price: 39.99, description: 'Premium quality item' },
    { id: 3, name: 'Product 3', price: 49.99, description: 'Best seller' },
    { id: 4, name: 'Product 4', price: 59.99, description: 'Top rated product' },
    { id: 5, name: 'Product 5', price: 69.99, description: 'Customer favorite' },
    { id: 6, name: 'Product 6', price: 79.99, description: 'Limited edition' },
  ];

  const handleAdd = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={`https://via.placeholder.com/200?text=${product.name}`} alt={product.name} />
            </div>
            <div className="product-info">
              <h2>{product.name}</h2>
              <p className="description">{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <button className="add-to-cart" onClick={() => handleAdd(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

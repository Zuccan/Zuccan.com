import React from 'react';
import { ProductsShowcase } from '../../components/products/ProductsShowcase/ProductsShowcase';
import './Products.css';

export const Products = () => {
  return (
    <div className="products-page-container">
      <ProductsShowcase />
    </div>
  );
};

export default Products;

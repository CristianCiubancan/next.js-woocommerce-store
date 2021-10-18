import React from "react";
import Product from "../product";
import "./products-container.module.scss";

const ProductsContainer = ({ products }) => {
  return (
    <div className="products-container-wrapper">
      {products.products.edges.map((product) => {
        return <Product key={product.node.databaseId} product={product.node} />;
      })}
    </div>
  );
};

export default ProductsContainer;

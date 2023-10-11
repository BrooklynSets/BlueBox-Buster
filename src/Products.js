import React from 'react';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, createProduct })=> {
  
  const nonVip = products.filter( product => product.vip_only === false)
  const yesVip = products.filter( product => product.vip_only === true)
  
  
  return (
    <div>
      <h2>Products</h2>
      {
        auth.is_admin ? (
          <CreateProduct createProduct={createProduct}/>
        ) : null
      }
      {
        auth.is_vip ? (
        <div>
        <h2>Vip Only!</h2>
          <ul>
        {
          yesVip.map( product => {
            
            
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            
            return (
              <li key={ product.id }>
                {
                  product.image ? <img src={ product.image } /> : null
                } 
                 <br/>
                <Link to={`/products/${product.id}`}>
                  {`${ product.name }`}
                </Link>
                {`: $${(product.price / 100).toFixed(2)}`}
                <br></br>
                {`${ product.description }`}
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
              </li>
            );
          })
        }
      </ul>
      </div>
        ) : null
      }
      <h2>All Products</h2>
      <ul>
        {
          nonVip.map( product => {
            
            
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            
            return (
              <li key={ product.id }>
                {
                  product.image ? <img src={ product.image } /> : null
                } 
                 <br/>
                <Link to={`/products/${product.id}`}>
                  {`${ product.name }`}
                </Link>
                {`: $${(product.price / 100).toFixed(2)}`}
                <br></br>
                {`${ product.description }`}
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;

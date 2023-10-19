import React from 'react';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import VipProducts from './VipProducts';
import NonVipProducts from './NonVipProducts';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, createProduct, updateProduct, wishLists, addWishList, removeWishList, tags, tag_lines, bookmarks, createBookmark, removeBookmark }) => {

  return (
    <div className='allProductsPage'>
      <h2>Products</h2>
      <div className='productBlocks'>
      { 
        auth.is_vip || auth.is_admin ?
            <VipProducts
              products={products}
              cartItems={cartItems}
              createLineItem={createLineItem}
              updateLineItem={updateLineItem}
              auth={auth}
              updateProduct={updateProduct}
              tags={tags}
              tag_lines={tag_lines}
              wishLists={wishLists}
              addWishList={addWishList}
              removeWishList={removeWishList}
              bookmarks={bookmarks}
              createBookmark={createBookmark}
              removeBookmark={removeBookmark}
            />
          : null
      }
      <NonVipProducts
        products={products}
        cartItems={cartItems}
        createLineItem={createLineItem}
        updateLineItem={updateLineItem}
        auth={auth}
        updateProduct={updateProduct}
        tags={tags}
        tag_lines={tag_lines}
        wishLists={wishLists}
        addWishList={addWishList}
        removeWishList={removeWishList}
        bookmarks={bookmarks}
        createBookmark={createBookmark}
        removeBookmark={removeBookmark}
      />

      {
        auth.is_admin ? (
          <div className='productForm'>
          <CreateProduct createProduct={createProduct} />
          </div>
        ) : null
      }
      </div>
    
    </div>
  );
};

export default Products;

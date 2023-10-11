import axios from 'axios';

const getHeaders = ()=> {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchProducts = async(setProducts)=> {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchWishLists = async(setWishLists)=> {
  const response = await axios.get('/api/products');
  setWishLists(response.data);
};


const fetchOrders = async(setOrders)=> {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const fetchAllOrders = async(setAllOrders)=> {
  const response = await axios.get('/api/orders/all', getHeaders());
  setAllOrders(response.data);
};

const fetchUsers = async(setUsers)=> {
  const response = await axios.get('/api/users', getHeaders());
  setUsers(response.data);
};

const fetchLineItems = async(setLineItems)=> {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

const fetchAllLineItems = async(setAllLineItems)=> {
  const response = await axios.get('/api/lineItems/all', getHeaders());
  setAllLineItems(response.data);
};

const createLineItem = async({ product, cart, lineItems, setLineItems })=> {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};

const createProduct = async({ product, products, setProducts })=> {
  const response = await axios.post('/api/products', product, getHeaders());
  setProducts([...products, response.data]);
};

const updateLineItem = async({ lineItem, cart, lineItems, setLineItems })=> {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
};

const updateProduct = async({ updatedProduct, products, setProducts }) => {
    const response = await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct, getHeaders());
    setProducts(products.map(product => product.id === updatedProduct.id ? response.data : product));
}

const updateOrder = async({ order, setOrders })=> {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const updateWishList = async({ wishList, setWishLists }) => {
  await axios.put(`api/wishlists/${wishlist.id}`, wishList, getHeaders());
  const response = await axios.get('/api/wishlists', getHeaders());
  setWishLists(response.data);
}

const increaseQuantity = async ({lineItem, lineItems, setLineItems}) => {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    ...lineItem,
    quantity: lineItem.quantity + 1
  }, getHeaders());
  setLineItems(lineItems.map(lineItem => lineItem.id == response.data.id ? response.data : lineItem));
};


const decreaseQuantity = async ({lineItem, lineItems, setLineItems}) => {
  if (lineItem.quantity > 1) {
    const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    ...lineItem,
    quantity: lineItem.quantity - 1
  }, getHeaders());
  setLineItems(lineItems.map(lineItem => lineItem.id == response.data.id ? response.data : lineItem));
  }
  if (lineItem.quantity === 1) {
    await removeFromCart({lineItem, lineItems, setLineItems});
  }
  
}

const removeFromCart = async({ lineItem, lineItems, setLineItems })=> {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
};

const attemptLoginWithToken = async(setAuth)=> {
  const token = window.localStorage.getItem('token');
  if(token){
    try {
      const response = await axios.get('/api/me', getHeaders());
      setAuth(response.data);
    }
    catch(ex){
      if(ex.response.status === 401){
        window.localStorage.removeItem('token');
      }
    }
  }
}

const register = async({ credentials, setAuth }) => {
  const response = await axios.post('/api/users', credentials);
  console.log(response);
  if (response.data.id && response.data.username === credentials.username) {
    login({credentials, setAuth});
  }
}

const login = async({ credentials, setAuth })=> {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
}

const logout = (setAuth)=> {
  window.localStorage.removeItem('token');
  setAuth({});
}

const api = {
  login,
  logout,
  register,
  fetchProducts,
  fetchOrders,
  fetchWishLists,
  fetchAllOrders,
  fetchUsers,
  fetchLineItems,
  fetchAllLineItems,
  createLineItem,
  createProduct,
  updateLineItem,
  updateOrder,
  updateWishList,
  updateProduct,
  removeFromCart,
  attemptLoginWithToken,
  increaseQuantity,
  decreaseQuantity
};

export default api;

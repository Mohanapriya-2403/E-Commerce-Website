// Function to get cart from localStorage
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Function to add item to cart
export const addToCart = (product) => {
  const cart = getCart();
  const existItem = cart.find((x) => x._id === product._id);

  if (existItem) {
    existItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

// Function to remove item from cart
export const removeFromCart = (id) => {
  const cart = getCart();
  const newCart = cart.filter((x) => x._id !== id);
  localStorage.setItem('cart', JSON.stringify(newCart));
  return newCart;
};
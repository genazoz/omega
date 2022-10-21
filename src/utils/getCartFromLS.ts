export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');

  const items = data ? JSON.parse(data).items : [];
  const totalCount = data ? JSON.parse(data).totalCount : 0;
  const totalPrice = data ? JSON.parse(data).totalPrice : 0;

  return {
    items,
    totalCount,
    totalPrice
  };
}
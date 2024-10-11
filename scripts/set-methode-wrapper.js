export let setMapWrapper = function (cartItems, key, value) {
    let totalPrice = 0;
    if (!key || !value) {
      cartItems.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
      return totalPrice;
    }
  
    cartItems.set(key, value);
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    if (cartItems.size > 1) {
      document.getElementById("price").textContent = `$ ${totalPrice}`;
    }
    return totalPrice;
  };
  
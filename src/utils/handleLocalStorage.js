export const updateLocalStorage = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
};

export const getCartFromLocalStorage = () => {
    const key = 'cart';
    const cartData = localStorage.getItem(key);

    return cartData ? JSON.parse(cartData) : [];
};





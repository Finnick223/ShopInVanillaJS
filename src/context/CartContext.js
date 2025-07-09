export const CartContext = {
    products: [],
    cartData: [],
    selectedItems: new Set(),
    elements: {
        productList: null,
        cart: null,
    },
    actions: {
        addProductToCart: () => { },
        deleteItemFromCart: () => { },
        handleCartQuantityChange: () => { },
    }
};

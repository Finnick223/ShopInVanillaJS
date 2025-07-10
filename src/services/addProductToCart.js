import { CartContext } from "../context/CartContext.js";
import { updateLocalStorage } from "../utils/handleLocalStorage.js";
import { renderCart } from "../features/renderCart.js";

export const addProductToCart = (product) => {
    const existingItem = CartContext.cartData.find((item) => item.name === product.name);

    if (!existingItem) {
        CartContext.cartData.push({ ...product });
    }
    else {
        existingItem.quantity = Math.min(existingItem.quantity + product.quantity, 99);
    }

    updateLocalStorage(CartContext.cartData);
    renderCart();
};

import { CartContext } from "../context/CartContext.js";
import { updateLocalStorage } from "../utils/handleLocalStorage.js";
import { renderCart } from "../features/renderCart.js";

export const deleteItemFromCart = (id) => {
    const indexOfDeletedItem = CartContext.cartData.findIndex(item => item.id === id);

    if (indexOfDeletedItem !== -1) {
        CartContext.cartData.splice(indexOfDeletedItem, 1)
    }

    updateLocalStorage(CartContext.cartData);
    renderCart();
};
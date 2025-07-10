import { CartContext } from "../context/CartContext.js";
import { updateLocalStorage } from "../utils/handleLocalStorage.js";
import { renderCart } from "../features/renderCart.js";

export const handleCartQuantityChange = (id, quantity) => {
    if (quantity < 1 && quantity > 99) return

    const item = CartContext.cartData.find(i => i.id === id);

    if (item) {
        item.quantity = quantity;
        updateLocalStorage(CartContext.cartData);
        renderCart();
    }
};
import { CartContext } from "../context/CartContext.js";
import { renderCart } from "../components/Cart.js";

export const handleCartEvents = (event) => {
    const target = event.target;
    const { toggleManufacturerSelection, toggleItemSelection, deleteProductFromCart } = CartContext.actions;

    if (target.matches('.cart-manufacturer__checkbox')) {
        toggleManufacturerSelection(target.id, target.checked);
    }
    if (target.matches('.cart-item__checkbox')) {
        toggleItemSelection(target.dataset.id, target.checked);
    }
    if (target.matches('.cart-item__delete-button')) {
        deleteProductFromCart(target.dataset.id);
    }

    renderCart();
};

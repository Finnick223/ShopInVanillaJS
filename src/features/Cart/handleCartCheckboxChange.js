import { CartContext } from "../../context/CartContext.js"
import { renderCart } from "./renderCart.js";

export const handleCartCheckboxChange = (event) => {
    const { selectedItems, cartData } = CartContext;
    const target = event.target;

    if (target.matches('.cart-manufacturer__checkbox')) {
        const manufacturer = target.id;
        const isChecked = target.checked;

        cartData.forEach(product => {
            if (product.manufacturer === manufacturer) {
                isChecked ? selectedItems.add(product.id) : selectedItems.delete(product.id);
            }
        });
        renderCart();
    }

    if (target.matches('.cart-item__checkbox')) {
        const itemId = target.dataset.id;
        const isChecked = target.checked;

        isChecked ? selectedItems.add(itemId) : selectedItems.delete(itemId);
        renderCart();
    }
}
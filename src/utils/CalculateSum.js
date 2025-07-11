import { CartContext } from "../context/CartContext.js";

export const calculateSum = () => {
    const { cartData, selectedItems } = CartContext;
    let total = 0;
    for (const item of cartData) {
        if (selectedItems.has(item.id)) {
            total += item.quantity * item.price;
        }
    }
    const totalElement = document.querySelector('#cart-total');
    totalElement.textContent = `Grand Total: ${total.toFixed(2)}$`;
}
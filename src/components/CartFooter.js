import { CartContext } from "../context/CartContext.js";

export const createCartFooter = () => {
    const template = document.getElementById('cart-footer-template');
    const clone = template.content.cloneNode(true);
    const buyButton = clone.querySelector('.footer__buy-button');

    buyButton.addEventListener('click', () => {
        const { cartData, selectedItems } = CartContext;
        const selectedProducts = cartData.filter(item => selectedItems.has(item.id));
        console.log('Selected items:', selectedProducts);
    });

    return clone;
};

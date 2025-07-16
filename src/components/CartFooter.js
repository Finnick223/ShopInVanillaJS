import { renderCheckoutModal } from "./Modal.js";

export const createCartFooter = () => {
    const template = document.getElementById('cart-footer-template');
    const clone = template.content.cloneNode(true);
    const buyButton = clone.querySelector('.footer__buy-button');

    buyButton.addEventListener('click', () => {
        renderCheckoutModal();
    });

    return clone;
};

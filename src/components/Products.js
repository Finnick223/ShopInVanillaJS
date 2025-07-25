import { CartContext } from '../context/CartContext.js';
import { createInput } from './shared/input.js';

export const renderProducts = (productsToRender = CartContext.products) => {
    const { productList } = CartContext.elements;
    productList.replaceChildren();

    const urlParams = new URLSearchParams(window.location.search);
    const manufacturerFilter = urlParams.get('manufacturer');
    productsToRender = manufacturerFilter ? productsToRender.filter(item => item.manufacturer === manufacturerFilter) : productsToRender;

    const template = document.getElementById('product-card-template');

    for (const product of productsToRender) {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.product__name').textContent = product.name;
        clone.querySelector('.product__manufacturer').textContent = product.manufacturer;
        clone.querySelector('.product__price').textContent = `${product.price} $`;
        clone.querySelector('.product__add-button').addEventListener('click', () => CartContext.actions.addProductToCart(product));

        const inputWrapper = clone.querySelector('.quantity');
        const quantityInput = createInput({
            id: product.id,
            type: 'number',
            value: product.quantity ?? 1,
            min: 1,
            max: 99,
            inputMode: 'numeric',
            onInput: (event) => {
                if (Number(event.target.value) <= 99) product.quantity = Number(event.target.value);
            }
        });
        inputWrapper.appendChild(quantityInput);

        productList.appendChild(clone);
    }
}
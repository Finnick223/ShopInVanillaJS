import { CartContext } from '../context/CartContext.js';
import { createInput } from './shared/input.js';


export const createCartItem = ({ item }) => {
    const { selectedItems, actions: { deleteProductFromCart } } = CartContext;
    const template = document.getElementById('cart-item-template');
    const product = template.content.cloneNode(true);

    product.querySelector('.cart-item__checkbox').dataset.id = item.id;
    product.querySelector('.cart-item__checkbox').checked = selectedItems.has(item.id);
    product.querySelector('.cart-item__name').textContent = item.name;
    product.querySelector('.cart-item__manufacturer').textContent = item.manufacturer;
    product.querySelector('.cart-item__price').textContent = (item.price * item.quantity).toFixed(2) + ' $';
    product.querySelector('.cart-item__delete-button').addEventListener('click', () => deleteProductFromCart(item.id));

    const quantity = product.querySelector('.quantity');
    const quantityInput = createInput({
        type: 'number',
        value: item.quantity,
        id: item.id,
        min: 1,
        max: 99,
        inputMode: 'numeric',
        onInput: (event) => {
            const inputId = event.target.id;
            const inputQuantity = Number(event.target.value);
            CartContext.actions.handleCartQuantityChange(inputId, inputQuantity);
        }
    });
    quantity.appendChild(quantityInput);

    return product;
};

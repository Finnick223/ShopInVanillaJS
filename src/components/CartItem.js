import { CartContext } from '../context/CartContext.js';
import { CalculateSum } from "../utils/CalculateSum.js";
import { renderCart } from '../features/renderCart.js'
import { createInput } from './shared/input.js';


export const createCartItem = ({ item, manufacturer, manufacturerCheckbox }) => {
    const template = document.getElementById('cart-item-template');
    const product = template.content.cloneNode(true);

    const checkbox = product.querySelector('.cart-item__checkbox');
    checkbox.checked = CartContext.selectedItems.has(item.id);
    checkbox.addEventListener('change', (event) => {
        event.target.checked ? CartContext.selectedItems.add(item.id) : CartContext.selectedItems.delete(item.id);
        manufacturerCheckbox.checked = manufacturer.items.every(item => CartContext.selectedItems.has(item.id));
        renderCart();
        CalculateSum();
    });

    product.querySelector('.cart-item__name').textContent = item.name;
    product.querySelector('.cart-item__manufacturer').textContent = item.manufacturer;
    product.querySelector('.cart-item__price').textContent = (item.price * item.quantity).toFixed(2) + ' $';

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

    const buttonDelete = product.querySelector('.button--delete');
    buttonDelete.addEventListener('click', () => CartContext.actions.deleteItemFromCart(item.id));

    return product;
};

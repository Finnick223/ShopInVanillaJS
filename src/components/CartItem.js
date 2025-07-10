import { CartContext } from '../context/CartContext.js';
import { CalculateSum } from "../utils/CalculateSum.js";
import { renderCart } from '../features/renderCart.js'


export const createCartItem = ({ item, manufacturer, manufacturerCheckbox }) => {
    const template = document.getElementById('cart-item-template');
    const product = template.content.cloneNode(true);

    const checkbox = product.querySelector('.item-checkbox');
    checkbox.checked = CartContext.selectedItems.has(item.id);
    checkbox.addEventListener('change', (event) => {
        event.target.checked ? CartContext.selectedItems.add(item.id) : CartContext.selectedItems.delete(item.id);
        manufacturerCheckbox.checked = manufacturer.items.every(item => CartContext.selectedItems.has(item.id));
        renderCart();
        CalculateSum();
    });

    product.querySelector('.item-name').textContent = item.name;
    product.querySelector('.item-manufacturer').textContent = item.manufacturer;
    product.querySelector('.item-price').textContent = (item.price * item.quantity).toFixed(2) + ' $';

    const quantityInput = product.querySelector('.item-quantity');
    quantityInput.value = item.quantity;
    quantityInput.addEventListener('input', (event) => {
        const inputQuantity = Number(event.target.value);
        CartContext.actions.handleCartQuantityChange(item.id, inputQuantity);
    });

    const buttonDelete = product.querySelector('.btn-del');
    buttonDelete.addEventListener('click', () => CartContext.actions.deleteItemFromCart(item.id));

    return product;
};

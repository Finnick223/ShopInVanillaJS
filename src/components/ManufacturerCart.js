import { createCartItem } from './CartItem.js';
import { CartContext } from '../context/CartContext.js';
import { renderCart } from '../features/renderCart.js';

export const createManufacturerCart = (manufacturer) => {
    const { selectedItems, cartData } = CartContext;

    const template = document.getElementById('manufacturer-cart-template');
    const clone = template.content.cloneNode(true);

    const wrapper = clone.querySelector('.cart-manufacturer');
    const checkbox = wrapper.querySelector('.cart-manufacturer__checkbox');
    const nameSpan = wrapper.querySelector('.cart-manufacturer__name');
    const itemsContainer = wrapper.querySelector('.cart-manufacturer__items');
    const sumText = wrapper.querySelector('.cart-manufacturer__sum-text');

    const allItemsSelected = manufacturer.items.every(item => selectedItems.has(item.id));
    checkbox.id = manufacturer.manufacturer;
    checkbox.checked = allItemsSelected;
    nameSpan.textContent = manufacturer.manufacturer;

    checkbox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        cartData.forEach(product => {
            if (product.manufacturer === event.target.id) {
                isChecked ? selectedItems.add(product.id) : selectedItems.delete(product.id);
            }
        });
        renderCart();
    });

    for (const item of manufacturer.items) {
        const productNode = createCartItem({
            item,
            manufacturer,
            manufacturerCheckbox: checkbox,
        });
        itemsContainer.appendChild(productNode);
    }

    const sum = manufacturer.items
        .filter(item => selectedItems.has(item.id))
        .reduce((total, item) => total + (item.quantity * item.price), 0)
        .toFixed(2);
    sumText.textContent = 'Total: ' + sum + '$';

    return wrapper;
};

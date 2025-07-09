import { createInput } from './shared/input.js'
import { createCartItem } from './createCartItem.js';
import { createParagraph } from './shared/paragraph.js';
import { CalculateSum } from '../utils/CalculateSum.js';
import { CartContext } from '../context/CartContext.js';
import { renderCart } from './renderCart.js';

export const createManufacturerCart = (manufacturer) => {
    const { selectedItems, cartData } = CartContext;

    const manufacturerWrapper = document.createElement('div');
    manufacturerWrapper.classList.add('cart-manufacturer-container');

    const allItemsSelected = manufacturer.items.every(item => selectedItems.has(item.id));
    const manufacturerCheckbox = createInput({
        type: 'checkbox',
        id: manufacturer.manufacturer,
        checked: allItemsSelected,
        onChange: (event) => {
            const isChecked = event.target.checked;
            cartData.forEach(product => {
                if (product.manufacturer === event.target.id) {
                    isChecked ? selectedItems.add(product.id) : selectedItems.delete(product.id);
                }
            });
            renderCart();
            CalculateSum();
        },
    })
    manufacturerWrapper.appendChild(manufacturerCheckbox);

    const label = document.createElement('label');
    label.setAttribute('for', manufacturer.manufacturer);
    label.classList.add('manufacturer-label')
    label.appendChild(manufacturerCheckbox);
    label.appendChild(document.createTextNode(manufacturer.manufacturer));
    manufacturerWrapper.appendChild(label);


    for (const item of manufacturer.items) {
        const productNode = createCartItem({
            item,
            manufacturer,
            manufacturerCheckbox,
        });
        manufacturerWrapper.appendChild(productNode);
    }

    const sum = manufacturer.items
        .filter(item => selectedItems.has(item.id))
        .reduce((sum, item) => sum + (item.quantity * item.price), 0)
        .toFixed(2);

    const totalManufacturerPrice = createParagraph({
        textContent: 'Total: ' + sum + '$',
        className: 'manufacturer-sum-text'
    });
    manufacturerWrapper.appendChild(totalManufacturerPrice);

    return manufacturerWrapper;
}
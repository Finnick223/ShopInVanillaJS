import { CartContext } from '../context/CartContext.js';
import { createButton } from "./shared/button.js";
import { createInput } from "./shared/input.js";
import { createParagraph } from "./shared/paragraph.js";
import { CalculateSum } from "../utils/CalculateSum.js";
import { renderCart } from '../features/renderCart.js'
import { createDiv } from './shared/div.js';

export const createCartItem = ({ item, manufacturer, manufacturerCheckbox }) => {
    const { selectedItems } = CartContext;

    const product = createDiv({ className: 'cart-item-container' });

    const checkbox = createInput({
        type: 'checkbox',
        id: item.id,
        checked: selectedItems.has(item.id),
        onChange: (event) => {
            event.target.checked ? selectedItems.add(item.id) : selectedItems.delete(item.id)
            manufacturerCheckbox.checked = manufacturer.items.every(item => selectedItems.has(item.id));
            renderCart();
            CalculateSum();
        }
    });
    product.appendChild(checkbox);

    const productName = createParagraph({ textContent: item.name });
    product.appendChild(productName);

    const productManufacturer = createParagraph({ textContent: item.manufacturer });
    product.appendChild(productManufacturer);

    const productPrice = createParagraph({ textContent: (item.price * item.quantity).toFixed(2) + ' $' });
    product.appendChild(productPrice);

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
    product.appendChild(quantityInput);

    const buttonDelete = createButton({
        textContent: '',
        className: 'button-del',
        onClick: () => CartContext.actions.deleteItemFromCart(item.id)
    });
    product.appendChild(buttonDelete);

    const img = document.createElement('img');
    img.src = 'assets/trash.svg';
    img.alt = 'Delete';
    img.classList.add('icon-delete');
    buttonDelete.appendChild(img);

    return product;
}
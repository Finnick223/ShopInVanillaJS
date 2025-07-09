import { createButton } from "./shared/button.js";
import { createInput } from "./shared/input.js";
import { createParagraph } from "./shared/paragraph.js";

export const createCartItem = ({ item, selectedItems, manufacturer, cartData, manufacturerCheckbox, deleteItemFromCart, handleCartQuantityChange, renderCart, cart, CalculateSum }) => {
    const product = document.createElement("div");
    product.classList.add('cart-item-container');

    const checkbox = createInput({
        type: 'checkbox',
        id: item.id,
        checked: selectedItems.has(item.id),
        onChange: (event) => {
            console.log(event.target.checked);
            event.target.checked ? selectedItems.add(item.id) : selectedItems.delete(item.id)

            manufacturerCheckbox.checked = manufacturer.items.every(item => selectedItems.has(item.id));
            renderCart(cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange);
            CalculateSum(cartData, selectedItems)
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
            handleCartQuantityChange(inputId, inputQuantity)
        }

    })
    product.appendChild(quantityInput)

    const buttonDelete = createButton({
        textContent: '',
        className: 'btn-del',
        onClick: () => deleteItemFromCart(item.id)
    });
    product.appendChild(buttonDelete);

    const img = document.createElement('img');
    img.src = 'assets/trash.svg';
    img.alt = 'Delete';
    img.style.height = '30px';
    img.style.cursor = 'pointer';
    buttonDelete.appendChild(img);


    return product;
}
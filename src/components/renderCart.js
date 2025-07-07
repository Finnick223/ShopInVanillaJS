import { CalculateSum } from "../utils/totalPrice.js";
import { groupByManufacturer } from "../utils/groupByManufacturer.js";
import { createButton } from "./shared/button.js";
import { createParagraph } from "./shared/paragraph.js";
import { createInput } from "./shared/input.js";

export const renderCart = (cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange) => {
    cart.replaceChildren();
    const groupedProducts = groupByManufacturer(cartData);


    for (const manufacturer of groupedProducts) {
        const manufacturerWrapper = document.createElement('div');
        manufacturerWrapper.classList.add('cart-manufacturer-container');
        cart.appendChild(manufacturerWrapper);

        const allItemsSelected = manufacturer.items.every(item => selectedItems.has(item.id));
        const manufacturerCheckbox = createInput({
            type: 'checkbox',
            id: manufacturer.manufacturer,
            checked: allItemsSelected,
            onChange: (e) => {
                if (e.target.checked) {
                    cartData.forEach(product => {
                        if (product.manufacturer === e.target.id) {
                            selectedItems.add(product.id);
                        }
                    });
                } else {
                    cartData.forEach(product => {
                        if (product.manufacturer === e.target.id) {
                            selectedItems.delete(product.id);
                        }
                    });
                }
                renderCart(cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange);
                CalculateSum(cart, cartData, selectedItems)
            },
        })
        manufacturerWrapper.appendChild(manufacturerCheckbox);

        const label = document.createElement('label');
        label.setAttribute('for', manufacturer.manufacturer);
        label.appendChild(manufacturerCheckbox);
        label.appendChild(document.createTextNode(manufacturer.manufacturer));
        manufacturerWrapper.appendChild(label);


        for (const item of manufacturer.items) {
            const product = document.createElement("div");
            product.classList.add('cart-item-container');
            manufacturerWrapper.appendChild(product);

            const checkbox = createInput({
                type: 'checkbox',
                id: item.id,
                checked: selectedItems.has(item.id),
                onChange: (e) => {
                    if (e.target.checked) {
                        selectedItems.add(item.id);
                    } else {
                        selectedItems.delete(item.id);
                    }

                    manufacturerCheckbox.checked = manufacturer.items.every(item => selectedItems.has(item.id));
                    CalculateSum(cart, cartData, selectedItems)
                }
            });
            product.appendChild(checkbox);


            const productName = createParagraph(item.name);
            product.appendChild(productName);

            const productManufacturer = createParagraph(item.manufacturer);
            product.appendChild(productManufacturer);

            const productPrice = createParagraph(item.price + '$');
            product.appendChild(productPrice);

            const quantityInput = createInput({
                type: 'number',
                value: item.quantity,
                id: item.id,
                min: 1,
                max: 99,
                inputMode: 'numeric',
                onInput: (e) => {
                    const inputId = e.target.id;
                    const inputQuantity = Number(e.target.value);
                    handleCartQuantityChange(inputId, inputQuantity)
                }

            })
            product.appendChild(quantityInput)


            const buttonDelete = createButton({
                textContent: 'X',
                className: 'btn-del',
                onClick: () => deleteItemFromCart(item.id)
            });
            product.appendChild(buttonDelete);
        }

        const sum = manufacturer.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
        const totalManufacturerPrice = createParagraph('Total: ' + sum + '$');
        manufacturerWrapper.appendChild(totalManufacturerPrice);
    }

    CalculateSum(cart, cartData, selectedItems);

    const buyButton = createButton(
        {
            textContent: 'BUY',
            type: 'submit',
            onClick: () => {
                // tu powinna byc logika wysylania zapytania post do api po uprzedniej walidacji danych z koszyka
                const selectedProductDetails = cartData.filter(item => selectedItems.has(item.id));
                console.log("przedmioty zaznaczone do kupienia:", selectedProductDetails);
            }
        }
    );
    cart.appendChild(buyButton);
}
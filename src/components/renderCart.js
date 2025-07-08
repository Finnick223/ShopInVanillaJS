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
            onChange: (event) => {
                if (event.target.checked) {
                    cartData.forEach(product => {
                        if (product.manufacturer === event.target.id) {
                            selectedItems.add(product.id);
                        }
                    });
                } else {
                    cartData.forEach(product => {
                        if (product.manufacturer === event.target.id) {
                            selectedItems.delete(product.id);
                        }
                    });
                }
                renderCart(cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange);
                CalculateSum(cartData, selectedItems)
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
            const product = document.createElement("div");
            product.classList.add('cart-item-container');
            manufacturerWrapper.appendChild(product);

            const checkbox = createInput({
                type: 'checkbox',
                id: item.id,
                checked: selectedItems.has(item.id),
                onChange: (event) => {
                    if (event.target.checked) {
                        selectedItems.add(item.id);
                    } else {
                        selectedItems.delete(item.id);
                    }

                    manufacturerCheckbox.checked = manufacturer.items.every(item => selectedItems.has(item.id));
                    CalculateSum(cartData, selectedItems)
                }
            });
            product.appendChild(checkbox);


            const productName = createParagraph({ textContent: item.name });
            product.appendChild(productName);

            const productManufacturer = createParagraph({ textContent: item.manufacturer });
            product.appendChild(productManufacturer);

            const productPrice = createParagraph({ textContent: item.price.toFixed(2) + '$' });
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
            img.style.height = '20px';
            buttonDelete.appendChild(img);
        }

        const sum = manufacturer.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2);
        const totalManufacturerPrice = createParagraph({
            textContent: 'Total: ' + sum + '$',
            className: 'manufacturer-sum-text'
        });
        manufacturerWrapper.appendChild(totalManufacturerPrice);
    }

    const totalElement = createParagraph({ textContent: '', id: 'cart-total', className: 'cart-total' });
    const buyButton = createButton({
        textContent: 'BUY',
        type: 'submit',
        onClick: () => {
            const selectedProductDetails = cartData.filter(item => selectedItems.has(item.id));
            console.log("przedmioty zaznaczone do kupienia:", selectedProductDetails);
        }
    });

    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('cart-footer');
    footerWrapper.appendChild(totalElement);
    footerWrapper.appendChild(buyButton);

    cart.appendChild(footerWrapper);

    CalculateSum(cartData, selectedItems);

}
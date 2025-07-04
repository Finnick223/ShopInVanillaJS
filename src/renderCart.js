import { CalculateSum } from "./totalPrice.js";

export const renderCart = (cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange) => {
    cart.replaceChildren();

    // creating map from cart data to group products in cart by manufacturer
    const map = new Map();
    for (const item of cartData) {
        const { manufacturer, ...rest } = item;
        if (!map.has(manufacturer)) {
            map.set(manufacturer, { manufacturer, items: [] });
        }
        map.get(manufacturer).items.push(rest);
    }
    const groupedProducts = Array.from(map.values());


    for (const manufacturer of groupedProducts) {
        const manufacturerWrapper = document.createElement('div');
        manufacturerWrapper.classList.add('cart-manufacturer-container');
        cart.appendChild(manufacturerWrapper);

        const manufacturerCheckbox = document.createElement('input');
        manufacturerCheckbox.type = "checkbox";
        manufacturerCheckbox.id = manufacturer.manufacturer;
        const allItemsSelected = manufacturer.items.every(item => selectedItems.has(item.id));
        manufacturerCheckbox.checked = allItemsSelected;
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

            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = item.id;
            checkbox.checked = selectedItems.has(item.id);
            product.appendChild(checkbox);



            const productName = document.createElement('p');
            productName.textContent = item.name;
            product.appendChild(productName);

            const productManufacturer = document.createElement('p');
            productManufacturer.textContent = item.manufacturer;
            product.appendChild(productManufacturer);

            const productPrice = document.createElement('p');
            productPrice.textContent = item.price + '$';
            product.appendChild(productPrice);

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.setAttribute("value", item.quantity);
            quantityInput.setAttribute("min", 1);
            quantityInput.setAttribute("max", 99);
            quantityInput.setAttribute("inputmode", "numeric")
            quantityInput.setAttribute("id", item.id)
            product.appendChild(quantityInput)

            const buttonDelete = document.createElement('button');
            buttonDelete.textContent = 'X';
            buttonDelete.classList.add('btn-del');
            product.appendChild(buttonDelete);


            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    selectedItems.add(item.id);
                } else {
                    selectedItems.delete(item.id);
                }
                CalculateSum(cart, cartData, selectedItems)
            });

            quantityInput.addEventListener('input', function (e) {
                const inputId = e.target.id;
                const inputQuantity = Number(e.target.value);
                handleCartQuantityChange(inputId, inputQuantity)
            })

            buttonDelete.addEventListener('click', () =>
                deleteItemFromCart(item.id)
            );
        }

        const sum = manufacturer.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
        const totalManufacturerPrice = document.createElement('p');
        totalManufacturerPrice.textContent = 'Total: ' + sum + '$';
        manufacturerWrapper.appendChild(totalManufacturerPrice);

        manufacturerCheckbox.addEventListener('change', (e) => {
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
        });
    }
    CalculateSum(cart, cartData, selectedItems);
}
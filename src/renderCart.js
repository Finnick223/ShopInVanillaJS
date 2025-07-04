export const renderCart = (cart, cartData, deleteItemFromCart) => {
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
        manufacturerWrapper.classList.add('cart-item-container');
        cart.appendChild(manufacturerWrapper);

        const manufacturerName = document.createElement('p');
        manufacturerName.textContent = manufacturer.manufacturer;
        manufacturerWrapper.appendChild(manufacturerName);

        for (const item of manufacturer.items) {
            console.log(item)
            const product = document.createElement("div");
            product.classList.add('cart-item-container');
            manufacturerWrapper.appendChild(product);

            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = item.key;
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
            product.appendChild(quantityInput)

            const buttonDelete = document.createElement('button');
            buttonDelete.textContent = 'X';
            buttonDelete.classList.add('btn-del');
            product.appendChild(buttonDelete);

            buttonDelete.addEventListener('click', () =>
                deleteItemFromCart(item.key)
            );
        }
    }
}
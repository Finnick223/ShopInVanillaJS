export const renderCart = (cart, cartData, deleteItemFromCart) => {
    cart.replaceChildren();

    for (const item of cartData) {
        const product = document.createElement("div");
        product.classList.add('cart-item-container');
        cart.appendChild(product);

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
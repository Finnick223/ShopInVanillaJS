export const renderProducts = (productList, products, addProductToCart) => {
    for (const product of products) {
        const productContainer = document.createElement("div");
        productContainer.classList.add('product-container');
        productList.appendChild(productContainer);

        const productName = document.createElement('p');
        productName.textContent = product.name;
        productContainer.appendChild(productName);

        const productManufacturer = document.createElement('p');
        productManufacturer.textContent = product.manufacturer;
        productContainer.appendChild(productManufacturer);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.setAttribute("value", product.quantity);
        quantityInput.setAttribute("min", 1);
        quantityInput.setAttribute("max", 99);
        quantityInput.setAttribute("inputmode", "numeric")
        productContainer.appendChild(quantityInput)

        const productPrice = document.createElement('p');
        productPrice.textContent = product.price * product.quantity + '$';
        productContainer.appendChild(productPrice);

        const buttonAdd = document.createElement('button');
        buttonAdd.textContent = 'add to cart';
        buttonAdd.classList.add('btn-add');
        productContainer.appendChild(buttonAdd);


        quantityInput.addEventListener('input', function (e) {
            product.quantity = Number(e.target.value);
            productPrice.textContent = product.price * product.quantity + '$';
        })

        buttonAdd.addEventListener('click', () =>
            addProductToCart(product)
        );
    }
}





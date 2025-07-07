import { createButton } from "./shared/button.js";
import { createInput } from "./shared/input.js";
import { createParagraph } from "./shared/paragraph.js";

export const renderProducts = (productList, products, addProductToCart) => {
    for (const product of products) {
        const productContainer = document.createElement("div");
        productContainer.classList.add('product-container');
        productList.appendChild(productContainer);

        const productName = document.createElement('h3');
        productName.textContent = product.name;
        productContainer.appendChild(productName);

        const productManufacturer = createParagraph(product.manufacturer);
        productContainer.appendChild(productManufacturer);

        const quantityInput = createInput({
            type: 'number',
            value: product.quantity,
            min: 1,
            max: 99,
            inputMode: 'numeric',
            onInput: (e) => {
                product.quantity = Number(e.target.value);
                productPrice.textContent = product.price * product.quantity + '$';
            }

        })
        productContainer.appendChild(quantityInput)

        const productPrice = createParagraph(product.price * product.quantity + '$');
        productContainer.appendChild(productPrice);

        const buttonAdd = createButton({
            textContent: 'add to cart',
            className: 'btn-add',
            onClick: () => addProductToCart(product)
        });
        productContainer.appendChild(buttonAdd);
    }
}





import { createButton } from "./shared/button.js";
import { createInput } from "./shared/input.js";
import { createParagraph } from "./shared/paragraph.js";

export const renderProducts = (productList, products, addProductToCart) => {
    for (const product of products) {
        const productContainer = document.createElement("div");
        productContainer.classList.add('product-container');
        productList.appendChild(productContainer);

        const topSection = document.createElement('div');
        topSection.classList.add('product-top');

        const imgPlaceholder = document.createElement('div');
        imgPlaceholder.classList.add('product-image');
        topSection.appendChild(imgPlaceholder);

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const productName = document.createElement('h3');
        productName.textContent = product.name;
        productInfo.appendChild(productName);

        const productManufacturer = createParagraph({ textContent: product.manufacturer });
        productInfo.appendChild(productManufacturer);

        const description = createParagraph({ textContent: 'Short description' });
        productInfo.appendChild(description);

        topSection.appendChild(productInfo);
        productContainer.appendChild(topSection);

        const bottomSection = document.createElement('div');
        bottomSection.classList.add('product-bottom');

        const productPrice = createParagraph({ textContent: product.price * product.quantity + '$' });
        bottomSection.appendChild(productPrice);

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
        bottomSection.appendChild(quantityInput)


        const buttonAdd = createButton({
            textContent: '',
            className: 'btn-add',
            onClick: () => addProductToCart(product)
        });

        const img = document.createElement('img');
        img.src = 'assets/cart.svg';
        img.alt = 'Add to cart';
        img.style.height = '20px';
        buttonAdd.appendChild(img);

        bottomSection.appendChild(buttonAdd);
        productContainer.appendChild(bottomSection);

    }
}





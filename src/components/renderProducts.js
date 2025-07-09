import { CartContext } from '../context/CartContext.js';
import { createButton } from "./shared/button.js";
import { createInput } from "./shared/input.js";
import { createParagraph } from "./shared/paragraph.js";

export const renderProducts = (productsToRender = CartContext.products) => {
    const { productList } = CartContext.elements;
    productList.replaceChildren();

    const urlParams = new URLSearchParams(window.location.search);
    const manufacturerFilter = urlParams.get('manufacturer');
    productsToRender = manufacturerFilter ? productsToRender.filter(item => item.manufacturer === manufacturerFilter) : productsToRender;

    for (const product of productsToRender) {
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

        const productPrice = createParagraph({ textContent: product.price + ' $' });
        bottomSection.appendChild(productPrice);

        const buttons = document.createElement('div');
        buttons.classList.add('product-buttons');

        const quantityInput = createInput({
            id: product.id,
            type: 'number',
            value: product.quantity ?? 1,
            min: 1,
            max: 99,
            inputMode: 'numeric',
            onInput: (event) => {
                if (Number(event.target.value) <= 99) product.quantity = Number(event.target.value);
            }
        });

        const buttonAdd = createButton({
            textContent: '',
            className: 'btn-add',
            onClick: () => CartContext.actions.addProductToCart(product)
        });

        const img = document.createElement('img');
        img.src = 'assets/cart.svg';
        img.alt = 'Add to cart';
        img.style.height = '20px';
        buttonAdd.appendChild(img);

        buttons.append(quantityInput, buttonAdd);
        bottomSection.appendChild(buttons);
        productContainer.appendChild(bottomSection);
    }
}
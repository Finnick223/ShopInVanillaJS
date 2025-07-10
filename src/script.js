"use strict";
import { CartContext } from './context/CartContext.js';
import { getElementsFromDOM } from './utils/getElementsFromDOM.js';
import { renderProducts } from './features/renderProducts.js';
import { renderCart } from './features/renderCart.js';
import { getCartFromLocalStorage } from './utils/handleLocalStorage.js';
import { createManufacturerFilter } from './components/ManufacturerFilter.js';
import { addProductToCart } from './services/addProductToCart.js';
import { deleteItemFromCart } from './services/deleteItemFromCart.js';
import { handleCartQuantityChange } from './services/handleCartQuantityChange.js';

const init = () => {
    const { productList, cart, searchInput } = getElementsFromDOM();
    CartContext.elements.productList = productList;
    CartContext.elements.cart = cart;
    CartContext.cartData = getCartFromLocalStorage();
    CartContext.actions = { addProductToCart, deleteItemFromCart, handleCartQuantityChange };
    renderCart();

    searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = CartContext.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

    (async () => {
        const response = await fetch('../products.json');
        const data = await response.json();
        CartContext.products.push(...data);
        renderProducts();
        createManufacturerFilter();
    })();
};

init();

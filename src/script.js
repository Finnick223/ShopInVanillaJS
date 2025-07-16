"use strict";
import { CartContext } from './context/CartContext.js';
import { getElementsFromDOM } from './utils/getElementsFromDOM.js';
import { renderProducts } from './components/Products.js';
import { renderCart } from './components/Cart.js';
import { getCartFromLocalStorage } from './utils/handleLocalStorage.js';
import { createManufacturerFilter } from './components/ManufacturerFilter.js';
import { CartService } from './services/cartService.js';
import { handleCartEvents } from './handlers/handleCartEvents.js';
import { closeModal } from './components/Modal.js';

const init = () => {
    const { productList, cart, searchInput } = getElementsFromDOM();
    CartContext.elements.productList = productList;
    CartContext.elements.cart = cart;
    CartContext.cartData = getCartFromLocalStorage();
    CartContext.actions = CartService;

    cart.addEventListener('change', handleCartEvents);
    renderCart();

    searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = CartContext.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

    window.addEventListener('load', () => {
        document.addEventListener('click', event => {
            if (event.target.classList.contains('modal')) {
                closeModal();
            }
        });
    });

    (async () => {
        try {
            const response = await fetch('../products.json');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            CartContext.products.push(...data);
            renderProducts();
            createManufacturerFilter();
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    })();
};

init();

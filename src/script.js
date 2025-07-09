"use strict";
import { CartContext } from './context/CartContext.js';
import { getElementsFromDOM } from './utils/getElementsFromDOM.js';
import { renderProducts } from './components/renderProducts.js';
import { renderCart } from './components/renderCart.js';
import { getCartFromLocalStorage, updateLocalStorage } from './utils/handleLocalStorage.js';

const init = () => {
    const { productList, cart, searchInput } = getElementsFromDOM();
    CartContext.elements.productList = productList;
    CartContext.elements.cart = cart;
    CartContext.cartData = getCartFromLocalStorage();

    const addProductToCart = (product) => {
        const existingItem = CartContext.cartData.find((item) => item.name === product.name);

        if (!existingItem) CartContext.cartData.push({ ...product });
        else {
            const newQuantity = existingItem.quantity + (product.quantity ?? 1);
            existingItem.quantity = Math.min(newQuantity, 99);
        }

        updateLocalStorage(CartContext.cartData);
        renderCart();
    };

    const deleteItemFromCart = (id) => {
        const indexOfDeletedItem = CartContext.cartData.findIndex(item => item.id === id);
        if (indexOfDeletedItem !== -1) CartContext.cartData.splice(indexOfDeletedItem, 1);
        updateLocalStorage(CartContext.cartData);
        renderCart();
    };

    const handleCartQuantityChange = (id, quantity) => {
        if (quantity >= 1 && quantity <= 99) {
            const item = CartContext.cartData.find(i => i.id === id);
            if (item) {
                item.quantity = quantity;
                updateLocalStorage(CartContext.cartData);
                renderCart();
            }
        }
    };

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
    })();
};

init();

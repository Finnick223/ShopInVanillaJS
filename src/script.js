"use strict";
import { getElementsFromDOM } from './utils/getElementsFromDOM.js'
import { renderProducts } from './components/renderProducts.js'
import { renderCart } from './components/renderCart.js';
import { getCartFromLocalStorage, updateLocalStorage } from './utils/handleLocalStorage.js';

const init = () => {
    const { productList, cart } = getElementsFromDOM();
    const products = [];
    const cartData = getCartFromLocalStorage();
    const selectedItems = new Set();

    const addProductToCart = (product) => {
        const existingItem = cartData.find((item) => item.name === product.name);

        if (!existingItem) cartData.push({ ...product });
        else {
            const newQuantity = existingItem.quantity + (product.quantity ?? 1);
            existingItem.quantity = newQuantity > 99 ? 99 : newQuantity;
        }

        updateLocalStorage(cartData);
        renderCart(cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange);
    }

    const deleteItemFromCart = (id) => {
        const indexOfDeletedItem = cartData.findIndex((item) => item.id === id);
        if (indexOfDeletedItem !== -1) {
            cartData.splice(indexOfDeletedItem, 1);
        }
        updateLocalStorage(cartData);
        renderCart(cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange)
    }

    const handleCartQuantityChange = (id, quantity) => {
        if (quantity >= 1 && quantity <= 99) {
            const cartTarget = cartData.find((item) => item.id === id)
            cartTarget.quantity = quantity;
            updateLocalStorage(cartData);
            renderCart(cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange)
        }
    };

    (async () => {
        try {
            const response = await fetch('../products.json');
            const data = await response.json();
            products.push(...data);
            renderProducts(productList, products, addProductToCart);
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    })();
    renderCart(cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange);   //localstorage przy starcie
}
init()


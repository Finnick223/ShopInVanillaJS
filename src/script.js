"use strict";
import { getElementsFromDOM } from './getElementsFromDOM.js'
import { renderProducts } from './renderProducts.js'
import { renderCart } from './renderCart.js';

const init = () => {
    const { productList, cart } = getElementsFromDOM();
    //wykminic sposob na pozbycie sie let, byc moze obiekt state z getterami i setterami
    let products = [];
    let cartData = [];
    const selectedItems = new Set();

    const addProductToCart = (product) => {
        const existingItem = cartData.find((item) => item.name === product.name);

        if (!existingItem) cartData.push({ ...product });
        else existingItem.quantity += product.quantity;

        renderCart(cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange);
    }

    const deleteItemFromCart = (id) => {
        const newCartData = cartData.filter((item) => item.id !== id)
        cartData = newCartData;
        renderCart(cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange)
    }

    const handleCartQuantityChange = (id, quantity) => {
        if (quantity >= 1 && quantity <= 99) {
            const cartTarget = cartData.find((item) => item.id === id)
            cartTarget.quantity = quantity;
            renderCart(cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange)
        }
    };

    fetch('../products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(productList, products, addProductToCart);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });

    // renderCart(cart, cartData, deleteItemFromCart);     jesli obsluga localstorage to render przy inicie
}

init()


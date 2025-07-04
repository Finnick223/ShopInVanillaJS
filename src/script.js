"use strict";
import { getElementsFromDOM } from './getElementsFromDOM.js'
import { renderProducts } from './renderProducts.js'
import { renderCart } from './renderCart.js';

const init = () => {
    const { productList, cart } = getElementsFromDOM();
    let products = [];
    let cartData = [];

    const addProductToCart = (product) => {
        const searchInCart = cartData.find((item) => item.name === product.name);

        if (!searchInCart) cartData.push({ ...product });
        else searchInCart.quantity += product.quantity;

        renderCart(cart, cartData, deleteItemFromCart);
    }

    const deleteItemFromCart = (key) => {
        const newCartData = cartData.filter((item) => item.key !== key)
        cartData = [...newCartData];
        renderCart(cart, cartData, deleteItemFromCart)
    }

    fetch('../products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(productList, products, addProductToCart);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });


    renderCart(cart, cartData, deleteItemFromCart);
}

init()


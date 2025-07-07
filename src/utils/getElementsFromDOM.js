export const getElementsFromDOM = () => {
    const productList = document.querySelector('.product-list');
    const cart = document.querySelector('.cart');

    if (!productList || !cart)
        throw new Error('Core elements not found');

    return {
        productList,
        cart
    };
};

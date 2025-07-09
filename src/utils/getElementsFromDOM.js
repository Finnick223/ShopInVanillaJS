export const getElementsFromDOM = () => {
    const productList = document.querySelector('.product-list');
    const cart = document.querySelector('.cart-content');
    const searchInput = document.querySelector('#search-products');

    if (!productList || !cart || !searchInput)
        throw new Error('Core elements not found');

    return {
        productList,
        cart,
        searchInput
    };
};

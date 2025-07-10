export const getElementsFromDOM = () => {
    const productList = document.querySelector('.product-list');
    const cart = document.querySelector('.cart-content');
    const searchInput = document.querySelector('#search-products');
    const manufacturerSelect = document.getElementById('manufacturer-select');

    if (!(productList || cart || searchInput || manufacturerSelect))
        throw new Error('Core elements not found');

    return {
        productList,
        cart,
        searchInput,
        manufacturerSelect
    };
};

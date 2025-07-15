export const getElementsFromDOM = () => {
    const productList = document.querySelector('.shop-list__elements');
    const cart = document.querySelector('.cart__content');
    const searchInput = document.querySelector('#search-products');
    const manufacturerSelect = document.querySelector('#manufacturer-select');

    if (!(productList && cart && searchInput && manufacturerSelect))
        throw new Error('Core elements not found');

    return {
        productList,
        cart,
        searchInput,
        manufacturerSelect
    };
};

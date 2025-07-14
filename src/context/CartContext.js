export const CartContext = {
    products: [],
    cartData: [],
    selectedItems: new Set(),
    elements: {
        productList: null,
        cart: null,
    },
    actions: {
        addProductToCart: (_product) => console.warn('addProductToCart not initialized'),
        deleteProductFromCart: (_id) => console.warn('deleteProductFromCart not initialized'),
        handleCartQuantityChange: (_id, _quantity) => console.warn('handleCartQuantityChange not initialized'),
        toggleManufacturerSelection: (_manufacturer, _isSelected) => console.warn('toggleManufacturerSelection not initialized'),
        toggleItemSelection: (_id, _isSelected) => console.warn('toggleItemSelection not initialized'),
    }
};

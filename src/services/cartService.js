import { CartContext } from "../context/CartContext.js";
import { updateLocalStorage } from "../utils/handleLocalStorage.js";
import { renderCart } from "../components/Cart.js";

export const CartService = {
    addProductToCart(product) {
        const existingItem = CartContext.cartData.find(item => item.name === product.name);

        if (!existingItem) {
            CartContext.cartData.push({ ...product });
        } else {
            existingItem.quantity = Math.min(existingItem.quantity + product.quantity, 99);
        }

        updateLocalStorage(CartContext.cartData);
        renderCart();
    },

    deleteProductFromCart(id) {
        const indexOfDeletedItem = CartContext.cartData.findIndex(item => item.id === id);

        if (indexOfDeletedItem !== -1) {
            CartContext.cartData.splice(indexOfDeletedItem, 1);
        }

        updateLocalStorage(CartContext.cartData);
        renderCart();
    },

    handleCartQuantityChange(id, quantity) {
        if (quantity < 1 || quantity > 99) return;

        const item = CartContext.cartData.find(i => i.id === id);

        if (item) {
            item.quantity = quantity;
            updateLocalStorage(CartContext.cartData);
            renderCart();
        }
    },

    toggleManufacturerSelection(manufacturer, isSelected) {
        CartContext.cartData.forEach(product => {
            if (product.manufacturer === manufacturer) {
                isSelected ? CartContext.selectedItems.add(id) : CartContext.selectedItems.delete(id);
            }
        });
    },

    toggleItemSelection(id, isSelected) {
        isSelected ? CartContext.selectedItems.add(id) : CartContext.selectedItems.delete(id);
    },
};
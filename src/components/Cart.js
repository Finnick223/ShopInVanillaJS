import { CartContext } from '../context/CartContext.js';
import { groupByManufacturer } from "../utils/groupByManufacturer.js";
import { createManufacturerCart } from './ManufacturerCart.js';
import { createCartFooter } from './CartFooter.js';
import { updateCartTotal } from '../utils/updateSum.js';

export const renderCart = () => {
    const { cart } = CartContext.elements;
    const { cartData } = CartContext;
    const groupedProducts = groupByManufacturer(cartData);

    cart.replaceChildren();

    for (const manufacturer of groupedProducts) {
        const manufacturerSection = createManufacturerCart(manufacturer);
        cart.appendChild(manufacturerSection);
    }

    cart.appendChild(createCartFooter());
    updateCartTotal('#cart-total');
};

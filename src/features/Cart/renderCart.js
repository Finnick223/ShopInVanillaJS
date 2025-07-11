import { CartContext } from '../../context/CartContext.js';
import { groupByManufacturer } from "../../utils/groupByManufacturer.js";
import { createManufacturerCart } from "../../components/ManufacturerCart.js";
import { calculateSum } from "../../utils/CalculateSum.js";
import { createCartFooter } from "../../components/CartFooter.js"

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
    calculateSum();
};

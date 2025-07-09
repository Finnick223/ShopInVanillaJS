import { CartContext } from '../context/CartContext.js';
import { groupByManufacturer } from "../utils/groupByManufacturer.js";
import { createManufacturerCart } from "./createManufacturerCart.js";
import { createButton } from "./shared/button.js";
import { createParagraph } from "./shared/paragraph.js";
import { CalculateSum } from "../utils/CalculateSum.js";
import { createDiv } from './shared/div.js';

export const renderCart = () => {
    const { cartData, selectedItems } = CartContext;
    const { cart } = CartContext.elements;

    cart.replaceChildren();

    const groupedProducts = groupByManufacturer(cartData);

    for (const manufacturer of groupedProducts) {
        const manufacturerSection = createManufacturerCart(manufacturer);
        cart.appendChild(manufacturerSection);
    }

    const totalElement = createParagraph({ textContent: '', id: 'cart-total', className: 'cart-total' });
    const buyButton = createButton({
        textContent: 'BUY',
        type: 'submit',
        onClick: () => {
            const selectedProducts = cartData.filter(item => selectedItems.has(item.id));
            console.log('Selected items:', selectedProducts);
        }
    });

    const footer = createDiv({ className: 'cart-footer' });
    footer.append(totalElement, buyButton);
    cart.appendChild(footer);

    CalculateSum();
}
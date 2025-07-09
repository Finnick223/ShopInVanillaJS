import { CalculateSum } from "../utils/CalculateSum.js";
import { groupByManufacturer } from "../utils/groupByManufacturer.js";
import { createButton } from "./shared/button.js";
import { createParagraph } from "./shared/paragraph.js";
import { createManufacturerCart } from "./createManufacturerCart.js";

export const renderCart = (cart, cartData, selectedItems, deleteItemFromCart, handleCartQuantityChange) => {
    cart.replaceChildren();
    const groupedProducts = groupByManufacturer(cartData);


    for (const manufacturer of groupedProducts) {
        const manufacturerSection = createManufacturerCart({
            manufacturer,
            selectedItems,
            cartData,
            renderCart,
            CalculateSum,
            deleteItemFromCart,
            handleCartQuantityChange,
            renderCart,
            cart
        });
        cart.appendChild(manufacturerSection);
    }

    const totalElement = createParagraph({ textContent: '', id: 'cart-total', className: 'cart-total' });

    const buyButton = createButton({
        textContent: 'BUY',
        type: 'submit',
        onClick: () => {
            const selectedProductDetails = cartData.filter(item => selectedItems.has(item.id));
            console.log("przedmioty zaznaczone do kupienia:", selectedProductDetails);
        }
    });

    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('cart-footer');
    footerWrapper.appendChild(totalElement);
    footerWrapper.appendChild(buyButton);
    cart.appendChild(footerWrapper);

    CalculateSum(cartData, selectedItems);

}
export const CalculateSum = (cart, cartData, selectedItems) => {
    let total = 0;
    for (const item of cartData) {
        if (selectedItems.has(item.id)) {
            total += item.quantity * item.price;
        }
    }
    let totalElement = document.querySelector('#cart-total');
    if (!totalElement) {
        totalElement = document.createElement('p');
        totalElement.id = 'cart-total';
        cart.appendChild(totalElement);
    }
    totalElement.textContent = `Grand Total: ${total}$`;
}
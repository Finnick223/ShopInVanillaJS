
export const CalculateSum = (cartData, selectedItems) => {
    let total = 0;
    for (const item of cartData) {
        if (selectedItems.has(item.id)) {
            total += item.quantity * item.price;
        }
    }
    let totalElement = document.querySelector('#cart-total');
    totalElement.textContent = `Grand Total: ${total.toFixed(2)}$`;
}
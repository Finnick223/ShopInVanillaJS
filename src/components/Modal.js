import { CartContext } from "../context/CartContext.js";

export const openModal = () => {
    document.querySelector('.modal').classList.add('open');
    document.body.classList.add('.modal-open');
}

export const closeModal = () => {
    const modal = document.querySelector('.modal.open');
    if (modal) {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }
}

const clearModal = () => {
    const modal = document.querySelector('#myModal');
    modal.replaceChildren();
};

const renderCheckoutTemplate = (selectedProducts) => {
    const template = document.getElementById('checkout-modal-template');
    const clone = template.content.cloneNode(true);

    const list = clone.querySelector('.checkout-list');
    const total = clone.querySelector('.checkout-total');

    let totalAmount = 0;
    selectedProducts.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price} $ x ${product.quantity}`;
        totalAmount += product.price * product.quantity;
        list.appendChild(li);
    });

    total.textContent = `Total: ${totalAmount.toFixed(2)} $`;

    return clone;
}

export const renderCheckoutModal = () => {
    const { cartData, selectedItems } = CartContext;
    const selectedProducts = cartData.filter(item => selectedItems.has(item.id));

    const modal = document.querySelector('#myModal');
    clearModal();

    const checkoutContent = renderCheckoutTemplate(selectedProducts);
    modal.appendChild(checkoutContent);

    modal.querySelector('.modal__close').addEventListener('click', closeModal);
    modal.querySelector('.modal__confirm').addEventListener('click', () => {
        const selectedPaymentInput = modal.querySelector('input[name="payment"]:checked');
        if (!selectedPaymentInput) {
            alert("Please select a payment method.");
            return;
        }
        const selectedPayment = selectedPaymentInput.value;

        selectedProducts.forEach(product => CartContext.actions.deleteProductFromCart(product.id));
        CartContext.selectedItems.clear();

        clearModal();

        const confirmationMessage = document.createElement('div');
        confirmationMessage.classList.add('modal__body');
        confirmationMessage.innerHTML = `
            <h2>Purchase Confirmed</h2>
            <p>Your payment method: <strong>${selectedPayment}</strong></p>
            <p>Thank you for your purchase!</p>
        `;

        modal.appendChild(confirmationMessage);
    });

    openModal();
};
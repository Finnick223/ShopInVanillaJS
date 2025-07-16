import { CartContext } from "../context/CartContext.js";
import { calculateSum } from "../utils/CalculateSum.js";

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
    const modal = document.querySelector('#buyModal');
    modal.replaceChildren();
};

const renderCheckoutTemplate = (selectedProducts) => {
    const template = document.getElementById('checkout-modal-template');
    const clone = template.content.cloneNode(true);

    const list = clone.querySelector('.checkout-list');
    const total = clone.querySelector('.checkout-total');

    selectedProducts.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price} $ x ${product.quantity}`;
        list.appendChild(li);
    });

    const totalAmount = calculateSum();
    total.textContent = `Total: ${totalAmount.toFixed(2)} $`;

    return clone;
}

export const renderCheckoutModal = () => {
    const { cartData, selectedItems } = CartContext;
    const selectedProducts = cartData.filter(item => selectedItems.has(item.id));

    const modal = document.querySelector('#buyModal');
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

        const confirmationTemplate = document.getElementById('confirmation-modal-template');
        const confirmationMessage = confirmationTemplate.content.cloneNode(true);
        confirmationMessage.querySelector('.payment-method strong').textContent = selectedPayment;
        modal.appendChild(confirmationMessage);
    });

    openModal();
};
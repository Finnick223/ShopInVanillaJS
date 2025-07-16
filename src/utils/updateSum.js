import { calculateSum } from './calculateSum.js';

export const updateCartTotal = (targetSelector) => {
    const total = calculateSum();
    const target = document.querySelector(targetSelector);
    if (target) target.textContent = `Grand Total: ${total.toFixed(2)}$`;
};

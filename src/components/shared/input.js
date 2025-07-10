import { createButton } from "./button.js";
import { createDiv } from "./div.js";

export const createInput = ({ type, id, value, checked, min, max, inputMode, onInput, onChange, onDecrease, onIncrease }) => {
    const input = document.createElement('input');
    Object.assign(input, { type, id });

    if (type === 'checkbox') {
        input.checked = !!checked;
        if (typeof onChange === 'function') {
            input.addEventListener('change', onChange);
        }

        return input;
    }

    if (type === 'number') {
        const numberInputWrapper = createDiv({ className: 'quantity' })
        numberInputWrapper.appendChild(input);


        Object.assign(input, { value, min, max, inputMode });
        if (typeof onInput === 'function') {
            input.addEventListener('input', onInput);
        }

        input.addEventListener('input', (event) => {
            input.value = input.value.replace(/[^\d]/g, '');
            let sanitazedDigits = parseInt(input.value.replace(/[^\d]/g, ''), 10);
            sanitazedDigits <= 99 ? input.value = sanitazedDigits : input.value = 99;
            typeof onInput === 'function' && onInput(event);
        });

        const buttonsWrapper = createDiv({ className: 'quantity-buttons' });
        const minusButton = createButton({ textContent: '-' });
        const plusButton = createButton({ textContent: '+' });
        buttonsWrapper.appendChild(plusButton);
        buttonsWrapper.appendChild(minusButton);
        numberInputWrapper.appendChild(buttonsWrapper);

        minusButton.addEventListener('click', (e) => {
            e.preventDefault();
            let current = parseInt(input.value, 10) || 0;
            if (current > min) {
                current--;
                input.value = current;
                input.dispatchEvent(new Event('input'));
                input.dispatchEvent(new Event('change'));
                typeof onDecrease === 'function' && onDecrease(current);
            }
        });

        plusButton.addEventListener('click', (e) => {
            e.preventDefault();
            let current = parseInt(input.value, 10) || 0;
            if (max === undefined || current < max) {
                current++;
                input.value = current;
                input.dispatchEvent(new Event('input'));
                input.dispatchEvent(new Event('change'));
                typeof onIncrease === 'function' && onIncrease(current);
            }
        });

        return numberInputWrapper;
    }
}

import { createButton } from "./button.js";
import { createDiv } from "./div.js";

export const createInput = ({ type, id, value, checked, min, max, inputMode, onInput, onChange }) => {
    const input = document.createElement('input');
    input.type = type;
    if (id) input.id = id;

    if (type === 'checkbox') {
        input.checked = !!checked;
        if (typeof onChange === 'function') {
            input.addEventListener('change', onChange);
        }

        return input;
    }

    if (type === 'number') {
        const NumberInputWrapper = createDiv({ className: 'quantity' })
        NumberInputWrapper.appendChild(input);


        if (value !== undefined) input.value = value;
        if (min !== undefined) input.min = min;
        if (max !== undefined) input.max = max;
        if (inputMode) input.inputMode = inputMode;
        if (typeof onInput === 'function') {
            input.addEventListener('input', onInput);
        }
        input.addEventListener('input', (event) => {
            input.value = input.value.replace(/[^\d]/g, '');
            let sanitazedDigits = parseInt(input.value.replace(/[^\d]/g, ''), 10);
            sanitazedDigits <= 99 ? input.value = sanitazedDigits : input.value = 99;
            if (typeof onInput === 'function') {
                onInput(event);
            }
        });

        const buttonsWrapper = createDiv({ className: 'quantity-buttons' });
        const minusButton = createButton({ textContent: '-' });
        const plusButton = createButton({ textContent: '+' });
        buttonsWrapper.appendChild(plusButton);
        buttonsWrapper.appendChild(minusButton);
        NumberInputWrapper.appendChild(buttonsWrapper);

        minusButton.addEventListener('click', (e) => {
            e.preventDefault();
            let current = parseInt(input.value, 10) || 0;
            if (current > min) {
                current--;
                input.value = current;
                input.dispatchEvent(new Event('input'));
                input.dispatchEvent(new Event('change'));
                if (typeof onDecrease === 'function') onDecrease(current);
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
                if (typeof onIncrease === 'function') onIncrease(current);
            }
        });

        return NumberInputWrapper;
    }
}

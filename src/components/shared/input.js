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
        const numberInputWrapper = document.createElement('div');
        numberInputWrapper.className = 'quantity';

        if (value !== undefined) input.value = value;
        if (min !== undefined) input.min = min;
        if (max !== undefined) input.max = max;
        if (inputMode) input.inputMode = inputMode;

        input.addEventListener('input', (event) => {
            input.value = input.value.replace(/[^\d]/g, '');
            let sanitizedValue = parseInt(input.value, 10) || 0;
            if (sanitizedValue > (max ?? 99)) sanitizedValue = max ?? 99;
            input.value = sanitizedValue;

            if (typeof onInput === 'function') onInput(event);
        });

        numberInputWrapper.appendChild(input);

        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.className = 'quantity-buttons';

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.type = 'button';

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.type = 'button';

        buttonsWrapper.appendChild(plusButton);
        buttonsWrapper.appendChild(minusButton);
        numberInputWrapper.appendChild(buttonsWrapper);

        minusButton.addEventListener('click', (e) => {
            e.preventDefault();
            let current = parseInt(input.value, 10) || 0;
            if (current > (min ?? 1)) {
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

        return numberInputWrapper;
    }
}
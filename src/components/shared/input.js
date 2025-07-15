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
        const numberInputWrapper = document.createElement('div');
        numberInputWrapper.className = 'quantity';

        Object.assign(input, { value, min, max, inputMode });
        if (typeof onInput === 'function') {
            input.addEventListener('input', onInput);
        }

        input.addEventListener('input', (event) => {
            input.value = input.value.replace(/[^\d]/g, '');
            let sanitazedDigits = parseInt(input.value.replace(/[^\d]/g, ''), 10);
            input.value = Math.min(Math.max(sanitazedDigits, 1), 99);
            typeof onInput === 'function' && onInput(event);
        });

        numberInputWrapper.appendChild(input);

        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.className = 'quantity__actions';

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